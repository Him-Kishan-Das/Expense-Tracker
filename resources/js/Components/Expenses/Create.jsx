import React, { useState } from 'react';

export default function CreateExpense({ setIsModalOpen }) {
    const [values, setValues] = useState({
        title: '',
        amount: '',
        date: '',
        category_id: '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Expense created: ${JSON.stringify(values, null, 2)}`);
        setValues({ title: '', amount: '', date: '', category_id: '' });
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Create Expense</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        name="category_id"
                        value={values.category_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    >
                        <option value="">Select a category</option>
                        <option value="1">Food</option>
                        <option value="2">Transport</option>
                        <option value="3">Entertainment</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Save Expense
                </button>
            </form>
        </div>
    );
}