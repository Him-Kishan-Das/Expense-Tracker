import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import CreateExpenses from "../../Components/Expenses/Create";

const ExpensesIndex = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const expenses = [
        { id: 1, title: 'Lunch', amount: 15.25, date: '2025-08-27', category: 'Food' },
        { id: 2, title: 'Bus Ticket', amount: 2.50, date: '2025-08-26', category: 'Transport' },
        { id: 3, title: 'Movie Ticket', amount: 10.00, date: '2025-08-25', category: 'Entertainment' },
    ];
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Expenses</h1>
            <button  className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block" onClick={()=> setIsModalOpen(true)} >Add New Expense</button>

            <Modal show={isModalOpen} maxWidth="md" onClose={() => setIsModalOpen(false)}>
                <CreateExpenses setIsModalOpen={setIsModalOpen} />
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
                            <td className="border border-gray-400 px-4 py-2">${expense.amount}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.date}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.category}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <Link href={`/expenses/${expense.id}/edit`} className="text-blue-500 underline mr-4">Edit</Link>
                                <button className="text-red-500 underline" onClick={() => alert(`Deleted expense: ${expense.title}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpensesIndex;