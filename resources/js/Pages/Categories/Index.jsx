import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import CreateCategories from "../../Components/Categories/Create";
import EditCategories from "../../Components/Categories/Edit";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";

const CategoriesIndex = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch categories and flash messages from props
    const { categories, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("categories.destroy", id), {
                onSuccess: () => alert("Category deleted successfully!"),
            });
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    return (
        <AppLayout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Categories</h1>

                {flash && (
                    <div className="bg-green-500 text-white p-4 rounded mb-4">
                        {flash}
                    </div>
                )}

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Add New Category
                </button>

                <Modal
                    show={isCreateModalOpen}
                    maxWidth="md"
                    onClose={() => setIsCreateModalOpen(false)}
                >
                    <CreateCategories
                        setIsCreateModalOpen={setIsCreateModalOpen}
                    />
                </Modal>

                <Modal
                    show={isEditModalOpen}
                    maxWidth="md"
                    onClose={() => setIsEditModalOpen(false)}
                >
                    {selectedCategory && (
                        <EditCategories
                            category={selectedCategory}
                            setIsEditModalOpen={setIsEditModalOpen}
                        />
                    )}
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
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {category.name}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="text-blue-500 underline mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 underline"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="border border-gray-400 px-4 py-2 text-center"
                                >
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
};

export default CategoriesIndex;
