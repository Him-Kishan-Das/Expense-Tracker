import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = ({ data }) => {
    console.log("Data received by ExpensesChart:", data);

    // Handle empty or invalid data
    const chartData = data.length > 0
        ? {
              labels: data.map((expense) => expense.category || "Unknown"),
              datasets: [
                  {
                      label: "Expenses",
                      data: data.map((expense) => expense.amount || 0),
                      backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#9966FF",
                          "#FF9F40",
                      ],
                      hoverBackgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#9966FF",
                          "#FF9F40",
                      ],
                  },
              ],
          }
        : null;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Expenses Distribution</h2>
            {chartData ? (
                <Pie data={chartData} />
            ) : (
                <p className="text-gray-500">No data available for the selected filters.</p>
            )}
        </div>
    );
};

export default ExpensesChart;