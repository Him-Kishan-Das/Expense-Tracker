import { useForm } from "@inertiajs/react";
import React from "react";

const EditCategories = ({ category, setIsEditModalOpen }) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("categories.update", category.id), {
            onSuccess: () => {
                setIsEditModalOpen(false); // Close the modal on success
            },
        });
    };

    return (
        <div className="p-6">
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Edit Category</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={processing}
                    >
                        Update Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCategories;