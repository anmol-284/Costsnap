import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required elements
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartdata, setChartdata] = useState({});

    useEffect(() => {
        
        fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

          const response = await fetch('http://localhost:8000/api/v1/expenseByCategory', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();

          console.log(result);

          if (Array.isArray(result)) {
              const labels = result.map(item => item._id);
              const values = result.map(item => item.mergedValues.average);

              const newChartData = {
                  labels: labels,
                  datasets: [
                      {
                          label:'income',
                          data: values,
                          backgroundColor: [
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              
                          ],
                      },
                  ],
              };

              

              setChartdata(newChartData);
              console.log("hhhhh",chartdata);
          } else {
              console.error('Invalid data format:', result);
          }
          console.log("eiefiwj",chartdata);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

    console.log('chartData:', chartdata);

    return (
        <div className='ml-60'>
            <h2>Donut Chart</h2>
            <div>
                <Pie data={chartdata} />
                 {Array.isArray(chartdata) && chartdata.map((data) => (
                  <div>
                    <p>{data.mergedValues.total}</p>
                  </div>
                 ))}
            </div>
        </div>
    );
};


export default PieChart
