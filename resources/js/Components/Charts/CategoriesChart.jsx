import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CategoriesChart = ({ data = [] }) => {
    console.log("Data received by CategoriesChart:", data); // Log the data for debugging

    const chartData = {
        labels: data.map((category) => category.name || "Unknown"), // Add a fallback for name
        datasets: [
            {
                label: "Number of Items",
                data: data.map((category) => parseInt(category.count) || 0), // Add a fallback for count
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
            {data.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p className="text-gray-500">No data available for the selected filters.</p>
            )}
        </div>
    );
};

export default CategoriesChart;