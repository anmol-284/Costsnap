import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
    const [chartData, setChartData] = useState([]);

    // useEffect(() => {
        const fetchData = async () => {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
            try {
                console.log(token);

                const response = await fetch('http://localhost:8000/api/v1/expensebycategory', {
                    method: 'GET',
                    headers: {
                        'Authorisation': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                console.log(result);



                // Check if result is an array before mapping over it
                if (Array.isArray(result)) {
                    const labels = result.map(item => item._id);
                    const values = result.map(item => item.mergedValues.total);
                    

                    //   console.log(labels);
                    //   console.log(values);

                    const newChartData = {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                ],
                            },
                        ],
                    };

                      console.log(newChartData);

                    setChartData(newChartData);
                    // this.forceUpdate();
                    console.log(chartData);
                } else {
                    // Handle the case where result is not an array
                    console.error('Invalid data format:', result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // console.log(chartData);

        // setChartData(1);
        // forceUpdate();
        // console.log(chartData);
    // }, ); // Empty dependency array ensures the effect runs once when the component mounts

    // useEffect(() => {
    //     // Log the state whenever it changes
    //     console.log('chartData changed:', chartData);
    //   }, [chartData]);

    
    // useEffect(() => {
    // },[]);
    
    // setChartData({labels:['food','others']});
    
    // console.log(JSON.stringify(chartData));

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