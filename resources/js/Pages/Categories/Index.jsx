import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import CreateCategories from "../../Components/Categories/Create";

const CategoriesIndex = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { categories, flash } = usePage().props;

    const handleDelete = (id) => {
        if(confirm("Are you sure you want to delete this category?")){
            Inertia.delete(route("categories.destroy", id), {
                onSuccess: () => alert("Category deleted successfully!"),
            });
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>
            {flash && <div className="bg-green-500 text-white p-4 rounded mb-4">{flash}</div>}
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
