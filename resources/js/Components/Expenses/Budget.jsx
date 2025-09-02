import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";

const Budget = ({ onClose, budget, month, year }) => {
    const [budgetAmount, setBudgetAmount] = useState(budget?.amount || "");

    const handleSaveBudget = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("month", month);
        formData.append("year", year);
        formData.append("amount", budgetAmount);

        Inertia.post(route("budget.store"), formData, {
            onSuccess: () => {
                alert("Budget saved successfully!");
                onclose();
            },
        });
    };
    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">Set Monthly Budget</h2>
                <form onSubmit={handleSaveBudget}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Budget Amount
                        </label>
                        <input
                            type="number"
                            value={budgetAmount}
                            onChange={(e) => setBudgetAmount(e.target.value)}
                            placeholder="Enter budget amount"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Budget;
