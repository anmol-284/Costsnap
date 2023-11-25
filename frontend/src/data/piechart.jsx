import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        data: [300, 150, 200, 100], // Hardcoded values for each category
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          // Add more colors as needed
        ],
      },
    ],
  });

  useEffect(() => {
    // Cleanup function to handle unmounting
    return () => {
      // Additional cleanup logic if needed
      if (chartData && chartData.datasets) {
        chartData.datasets.forEach(dataset => {
          if (dataset.controller) {
            dataset.controller.destroy();
          }
        });
      }
    };
  }, [chartData]); // Add dependencies as needed

  return (
    <div>
      <h2>Donut Chart</h2>
      <div>
        <Doughnut data={chartData} key={JSON.stringify(chartData)} />
      </div>
    </div>
  );
};

export default DonutChart;
