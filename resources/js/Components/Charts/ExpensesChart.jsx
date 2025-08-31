import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = ({ data = [] }) => { // Default data to an empty array
    const chartData = {
        labels: data.map((expense) => expense.category || "Unknown"), // Add a fallback for category
        datasets: [
            {
                label: "Expenses",
                data: data.map((expense) => expense.amount || 0), // Add a fallback for amount
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
            },
        ],
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Expenses Distribution</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default ExpensesChart;