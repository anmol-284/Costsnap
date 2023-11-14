import React, { useEffect, useState } from 'react';
import { Chart } from 'react-charts'; // Assuming you've installed and imported react-charts

const FinancialChart = () => {
    // Default financial data before fetching from the API
    const defaultFinancialData = [
        { dayOrMonth: 'Jan', income: 100, expenses: 60, savings: 40 },
        { dayOrMonth: 'Feb', income: 120, expenses: 80, savings: 40 },
        { dayOrMonth: 'March', income: 140, expenses: 70, savings: 70 },
        { dayOrMonth: 'April', income: 160, expenses: 80, savings: 80 },
        { dayOrMonth: 'May', income: 180, expenses: 100, savings: 80 },
        { dayOrMonth: 'June', income: 220, expenses: 110, savings: 110 },
        { dayOrMonth: 'July', income: 240, expenses: 150, savings: 90 },
        { dayOrMonth: 'Aug', income: 260, expenses: 180, savings: 80 },
        // Add more default data for visibility
    ];

    const [financialData, setFinancialData] = useState(defaultFinancialData);

    // Fetch data from your backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'yourAPIEndpoint' with your actual API endpoint
                const response = await fetch('yourAPIEndpoint');
                const data = await response.json();
                setFinancialData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = React.useMemo(() => [
        {
            label: 'Income',
            data: financialData.map(entry => [entry.dayOrMonth, entry.income]),
        },
        {
            label: 'Expenses',
            data: financialData.map(entry => [entry.dayOrMonth, entry.expenses]),
        },
        {
            label: 'Savings',
            data: financialData.map(entry => [entry.dayOrMonth, entry.savings]),
        },
    ], [financialData]);

    const axes = React.useMemo(() => [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' },
    ], []);

    return (
        <div style={{ width: '800px', height: '400px' }}>
            <Chart data={data} axes={axes} series={{ type: 'line' }} />
        </div>
    );
};

export default FinancialChart;
