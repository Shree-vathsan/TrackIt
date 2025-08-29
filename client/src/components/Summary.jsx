// client/src/components/Summary.jsx
import React, { useEffect, useState } from 'react'; // No need for useState and axios
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Component now accepts summaryData as a prop
const Summary = ({ summaryData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (summaryData) {
      // Prepare data for the pie chart
      const data = {
        labels: summaryData.summary.map(item => item._id),
        datasets: [
          {
            label: 'Expenses by Category',
            data: summaryData.summary.map(item => item.totalAmount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', // Pink
              'rgba(54, 162, 235, 0.7)', // Blue
              'rgba(255, 206, 86, 0.7)', // Yellow
              'rgba(75, 192, 192, 0.7)', // Green
              'rgba(153, 102, 255, 0.7)', // Purple
              'rgba(255, 159, 64, 0.7)', // Orange
              'rgba(199, 199, 199, 0.7)', // Grey
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [summaryData]); // Rerun effect when summaryData changes

  if (!summaryData || !chartData) {
    return <div className="loading-text">Loading summary...</div>;
  }

  return (
    <div className="summary-container">
      <h2>Expense Summary</h2>
      <div className="summary-total">
        Total Spent: <span className="total-amount">₹{summaryData.totalExpenses.toFixed(2)}</span>
      </div>
      <div className="chart-wrapper"> {/* Added wrapper for chart */}
        {summaryData.summary.length > 0 ? (
          <Pie data={chartData} options={{ maintainAspectRatio: false }} /> 
        ) : (
          <p className="no-data-message">No expense data to display a chart.</p>
        )}
      </div>
    </div>
  );
};

export default Summary;