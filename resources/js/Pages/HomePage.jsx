import React from "react";
import Navbar from "../Components/Navbar";
import ExpensesChart from "../Components/Charts/ExpensesChart";
import CategoriesChart from "../Components/Charts/CategoriesChart";
import { usePage } from "@inertiajs/react";

const Homepage = () => {
    const { expensesData = [], categoriesData = [] } = usePage().props; // Add default values as empty arrays

    return (
        <div>
            <Navbar />
            <div className="container mx-auto text-center mt-16">
                <h1 className="text-5xl font-bold mb-6">Welcome to Expense Tracker</h1>
                <p className="text-lg text-gray-600 mb-10">
                    Manage your categories and expenses with ease.
                </p>
                <div className="flex justify-center space-x-4 mb-16">
                    <a href="/categories" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                        Manage Categories
                    </a>
                    <a href="/expenses" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
                        Manage Expenses
                    </a>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="shadow-md p-4 rounded bg-white">
                        <ExpensesChart data={expensesData} />
                    </div>
                    <div className="shadow-md p-4 rounded bg-white">
                        <CategoriesChart data={categoriesData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;