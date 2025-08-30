import React from "react";
import { useForm } from "@inertiajs/react";

const EditExpenses = ({ expense, setIsEditModalOpen }) => {
    const { data, setData, patch, processing, errors } = useForm({
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        category_id: expense.category.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("expenses.update", expense.id), {
            onSuccess: () => {
                setIsEditModalOpen(false); // Close the modal on success
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    value={data.amount}
                    onChange={(e) => setData("amount", e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
                {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    value={data.date}
                    onChange={(e) => setData("date", e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
                {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={processing}
            >
                Update Expense
            </button>
        </form>
    );
};

export default EditExpenses;