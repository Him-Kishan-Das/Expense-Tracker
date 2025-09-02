import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import CreateExpenses from "../../Components/Expenses/Create";
import EditExpenses from "@/Components/Expenses/Edit";
import Budget from "@/Components/Expenses/Budget";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";

const ExpensesIndex = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const { expenses, categories, filters, flash } = usePage().props;

    // Initialize day, month, and year state variables
    const [day, setDay] = useState(filters?.day || "");
    const [month, setMonth] = useState(filters?.month || "");
    const [year, setYear] = useState(filters?.year || "");

    // State for budget progress
    const [budgetProgress, setBudgetProgress] = useState({
        monthlyExpenses: 0,
        budget: null,
        spendingPercentage: 0,
    });

    useEffect(() => {
        fetchBudgetProgress();
    }, [month, year]);

    // Fetch budget progress when month or year changes
    const fetchBudgetProgress = () => {
        const queryParams = new URLSearchParams({
            month: month || new Date().getMonth() + 1,
            year: year || new Date().getFullYear(),
        });
    
        fetch(`/expenses/budget-progress?${queryParams}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Budget Progress Data:", data); // Log the response
                setBudgetProgress({
                    ...data,
                    monthlyExpenses: Number(data.monthlyExpenses) || 0, // Ensure it's a number
                });
            })
            .catch((error) => {
                console.error("Error fetching budget progress:", error);
            });
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("expenses.destroy", id), {
                onSuccess: () => alert("Expenses deleted successfully"),
            });
        }
    };

    const applyFilters = (e) => {
        e.preventDefault();

        const filterData = {
            day: day || null,
            month: month || null,
            year: year || null,
        };

        Inertia.get(route("expenses.index"), filterData, {
            preserveState: true,
            replace: true,
        });
    };

    const exportFileteredCsv = () => {
        const queryParams = new URLSearchParams({
            day: day || "",
            month: month || "",
            year: year || "",
        }).toString();

        window.location.href = route("expenses.exportCsv") + "?" + queryParams;
    };

    return (
        <AppLayout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Expenses</h1>

                {/* Budget Progress and Button */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Monthly Budget Progress</h2>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                            onClick={() => setIsBudgetModalOpen(true)}
                        >
                            Set Budget
                        </button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-4">
                        <div
                            className="bg-green-500 h-6 rounded-full text-center text-white text-sm"
                            style={{
                                width: `${budgetProgress.spendingPercentage}%`,
                            }}
                        >
                            {budgetProgress.spendingPercentage.toFixed(1)}%
                        </div>
                    </div>
                    <p className="mt-2">
    Spent: Rs. {(budgetProgress.monthlyExpenses || 0).toFixed(2)} / Budget: Rs.{" "}
    {budgetProgress.budget?.amount || "Not Set"}
</p>
                </div>


                {/* Budget Modal */}
                <Modal
                    show={isBudgetModalOpen}
                    maxWidth="md"
                    onClose={() => setIsBudgetModalOpen(false)}
                >
                    <Budget
                        onClose={() => setIsBudgetModalOpen(false)}
                        budget={budgetProgress.budget} // Use budgetProgress.budget
                        month={month || new Date().getMonth() + 1}
                        year={year || new Date().getFullYear()}
                    />
                </Modal>

                <button
                    className="bg-orange-400 text-white px-4 py-2 rounded-md mb-4 inline-block"
                    onClick={exportFileteredCsv}
                >
                    Export as CSV
                </button>

                {/* Flash messages */}
                {flash && (
                    <div className="bg-green-500 text-white p-4 rounded mb-4">
                        {flash}
                    </div>
                )}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block ml-2"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Add New Expense
                </button>

                <form onSubmit={applyFilters} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Day</label>
                            <input
                                type="number"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                placeholder="Day (e.g., 15)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Month</label>
                            <input
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                placeholder="Month (e.g., 8)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Year (e.g., 2025)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                        Note: All fields are optional. Use the ones you need to filter your expenses.
                    </p>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Apply Filters
                        </button>
                    </div>
                </form>

                <Modal
                    show={isCreateModalOpen}
                    maxWidth="md"
                    onClose={() => setIsCreateModalOpen(false)}
                >
                    <CreateExpenses
                        setIsCreateModalOpen={setIsCreateModalOpen}
                        categories={categories}
                    />
                </Modal>

                <Modal
                    show={isEditModalOpen}
                    maxWidth="md"
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedExpense(null);
                    }}
                >
                    {selectedExpense && (
                        <EditExpenses
                            expense={selectedExpense}
                            setIsEditModalOpen={setIsEditModalOpen}
                        />
                    )}
                </Modal>

                <table className="table-auto w-full border-collapse border-gray-400 border">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Title</th>
                            <th className="border border-gray-400 px-4 py-2">Amount</th>
                            <th className="border border-gray-400 px-4 py-2">Date</th>
                            <th className="border border-gray-400 px-4 py-2">Category</th>
                            <th className="border border-gray-400 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="border border-gray-400 px-4 py-2">{expense.title}</td>
                                <td className="border border-gray-400 px-4 py-2">Rs. {expense.amount}</td>
                                <td className="border border-gray-400 px-4 py-2">{expense.date}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {expense.category?.name || "No Category"}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(expense)}
                                        className="text-blue-500 underline mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 underline"
                                        onClick={() => handleDelete(expense.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 border-t border-gray-400 pt-4">
                    <h2 className="text-xl font-bold">Total Expenses: Rs. {expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2)}</h2>
                </div>
            </div>
        </AppLayout>
    );
};

export default ExpensesIndex;