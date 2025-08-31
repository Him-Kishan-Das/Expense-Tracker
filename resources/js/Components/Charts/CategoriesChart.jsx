import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register required Chart.js elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CategoriesChart = ({ data = [] }) => { // Default data to an empty array
    const chartData = {
        labels: data.map((category) => category.name || "Unknown"), // Add a fallback for name
        datasets: [
            {
                label: "Number of Items",
                data: data.map((category) => category.count || 0), // Add a fallback for count
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Categories Overview</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default CategoriesChart;