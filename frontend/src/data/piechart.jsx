import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.replace(/(?:(?:^|.;\s)token\s*=\s*([^;]).$)|^.*$/, '$1');

                const response = await fetch('http://localhost:8000/api/v1/expensebycategory', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (Array.isArray(result)) {
                    const labels = result.map(item => item._id);
                    const values = result.map(item => item.mergedValues.total);

                    const newChartData = {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    
                                ],
                            },
                        ],
                    };

                    setChartData(prevData => {
                        console.log('Setting chartData:', newChartData);
                        return newChartData;
                    });
                } else {
                    console.error('Invalid data format:', result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log('chartData:', chartData);

    return (
        <div>
            <h2>Donut Chart</h2>
            <div>
                <Doughnut data={chartData} />
            </div>
        </div>
    );
};

export default DonutChart;