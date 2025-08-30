import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function CreateExpense({ setIsCreateModalOpen, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        amount: '',
        date: '',
        category_id: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route("expenses.store"), {
            onSucess: () => {
                reset();
                setIsCreateModalOpen(false);
            }
        })
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
                        value={data.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={data.amount}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                    {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                    {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        name="category_id"
                        value={data.category_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>
                    )}
                </div>
                <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={processing}>
                    Save Expense
                </button>
            </form>
        </div>
    );
}