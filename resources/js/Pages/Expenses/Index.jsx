import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import CreateExpenses from "../../Components/Expenses/Create";
import EditExpenses from "@/Components/Expenses/Edit";
import { Inertia } from "@inertiajs/inertia";

const ExpensesIndex = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const { expenses, categories, flash } = usePage().props;

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if(confirm('Are you sure you want to delete this category?')){
            Inertia.delete(route("expenses.destroy", id), {
                onSuccess: () => alert("Expenses deleted successfully"),
            })
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Expenses</h1>
            {/* Flash messages */}
            {flash && (
                <div className="bg-green-500 text-white p-4 rounded mb-4">
                    {flash}
                </div>
            )}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
                onClick={() => setIsCreateModalOpen(true)}
            >
                Add New Expense
            </button>

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
                    <EditExpenses expense={selectedExpense} setIsEditModalOpen={setIsEditModalOpen} />
                )}
            </Modal>

            <table className="table-auto w-full border-collapse border-gray-400 border">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">
                            Title
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Amount
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Date
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Category
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td className="border border-gray-400 px-4 py-2">
                                {expense.title}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ${expense.amount}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {expense.date}
                            </td>
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
                                    onClick={() =>
                                        handleDelete(expense.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpensesIndex;
