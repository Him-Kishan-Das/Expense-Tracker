import React from "react";
import Navbar from "../Components/Navbar";

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto text-center mt-16">
                <h1 className="text-5xl font-bold mb-6">Welcome to Expense Tracker</h1>
                <p className="text-lg text-gray-600 mb-10">
                    Manage your categories and expenses with ease.
                </p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="/categories"
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                    >
                        Manage Categories
                    </a>
                    <a
                        href="/expenses"
                        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
                    >
                        Manage Expenses
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Homepage;