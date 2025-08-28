import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import CreateCategories from "../../Components/Categories/Create";

const CategoriesIndex = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const categories = [
        { id: 1, name: "Food" },
        { id: 2, name: "Transport" },
        { id: 3, name: "Entertainment" },
    ];

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>
            <button
                
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
                onClick={() => setIsModalOpen(true)}
            >
                Add New Category
            </button>
            <Modal show={isModalOpen} maxWidth="md" onClose={() => setIsModalOpen(false)}>
                <CreateCategories setIsModalOpen={setIsModalOpen} />
            </Modal>
            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2 bg-indigo-300">
                            Name
                        </th>
                        <th className="border border-gray-400 px-4 py-2 bg-indigo-300">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="border border-gray-400 px-4 py-2">
                                {category.name}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <Link
                                    href={`/categories/4{category.id}/edit`}
                                    className="text-blue-500 underline mr-4"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="text-red-500 underline"
                                    onClick={() =>
                                        alert(
                                            `Deleted category: ${category.name}`
                                        )
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

export default CategoriesIndex;
