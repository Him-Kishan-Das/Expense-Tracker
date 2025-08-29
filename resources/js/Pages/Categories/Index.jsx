import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react"; // Added Inertia import for DELETE requests
import Modal from "../../Components/Modal";
import CreateCategories from "../../Components/Categories/Create";
import { Inertia } from "@inertiajs/inertia";

const CategoriesIndex = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch categories and flash messages from props
    const { categories, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("categories.destroy", id), {
                onSuccess: () => alert("Category deleted successfully!"),
            });
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>

            {/* Flash message */}
            {flash && <div className="bg-green-500 text-white p-4 rounded mb-4">{flash}</div>}

            {/* Add New Category Button */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
                onClick={() => setIsModalOpen(true)}
            >
                Add New Category
            </button>

            {/* Modal for Creating Categories */}
            <Modal show={isModalOpen} maxWidth="md" onClose={() => setIsModalOpen(false)}>
                <CreateCategories setIsModalOpen={setIsModalOpen} />
            </Modal>

            {/* Categories Table */}
            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2 bg-indigo-300">Name</th>
                        <th className="border border-gray-400 px-4 py-2 bg-indigo-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.id}>
                                <td className="border border-gray-400 px-4 py-2">{category.name}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {/* Corrected the Link URL */}
                                    <Link
                                        href={route("categories.edit", category.id)} // Dynamic URL generation
                                        className="text-blue-500 underline mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-red-500 underline"
                                        onClick={() => handleDelete(category.id)} // Pass the category ID
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="border border-gray-400 px-4 py-2 text-center">
                                No categories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesIndex;