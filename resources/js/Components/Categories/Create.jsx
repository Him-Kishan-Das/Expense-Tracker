import React, { useState } from "react";

const CreateCategory = ({ setIsModalOpen }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`New category created: ${name}`);
        setName('');
        setIsModalOpen(false);
    }

    return (
        <div className="p-6">
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Create Category</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                        <input required type="text" name="name" value={name}  onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Category</button>
                </form>
            </div>
        </div>

    )
}

export default CreateCategory;