import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import ExpensesChart from "../Components/Charts/ExpensesChart";
import CategoriesChart from "../Components/Charts/CategoriesChart";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Homepage = () => {
    const { expensesData = [], categoriesData = [], filters, error } = usePage().props;

    const [day, setDay] = useState(filters?.day || "");
    const [month, setMonth] = useState(filters?.month || "");
    const [year, setYear] = useState(filters?.year || "");

    const applyFilters = (e) => {
        e.preventDefault();

        // Prepare filters
        const filters = {
            day: day || null,
            month: month || null,
            year: year || null,
        };

        // Send filters to backend and reload data
        Inertia.reload({
            preserveState: true,
            replace: true,
            data: filters, // Attach filters as query parameters
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto text-center mt-16">
                <h1 className="text-5xl font-bold mb-6">Welcome to Expense Tracker</h1>
                <p className="text-lg text-gray-600 mb-10">Use filters to refine your expense data.</p>
                {error && <div className="mb-6 text-red-600"><p>{error}</p></div>}

                {/* Filters Section */}
                <form onSubmit={applyFilters} className="mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Day</label>
                            <input
                                type="number"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                placeholder="Day (e.g., 15)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Month</label>
                            <input
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                placeholder="Month (e.g., 8)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Year (e.g., 2025)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Apply Filters</button>
                    </div>
                </form>

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