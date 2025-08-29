import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateCategory = ({ setIsModalOpen }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("categories.store"), {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    return (
        <div className="p-6">
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Create Category</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700"
                        />
                        {/* Display validation error if exists */}
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
                        Save Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCategory;
