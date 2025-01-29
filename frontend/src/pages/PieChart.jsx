import { React, useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { getCookie } from '../components/utils';

// Register the required elements
Chart.register(ArcElement, Tooltip, Legend);

const Chartpage = () => {
  const [chartdata, setChartdata] = useState(null);
  const [weekdata, setWeekdata] = useState(null);
  const [monthdata, setMonthdata] = useState(null);
  const [yeardata, setYeardata] = useState(null);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetchData();
    fetchweekData();
    fetchmonthData();
    fetchyearData();
  }, []);


  useEffect(() => {

    console.log("updated", chartdata);

  }, [chartdata]);

  useEffect(() => {

    console.log("updated month", monthdata);

  }, [monthdata]);

  const fetchData = async () => {
    try {
      const token = getCookie('token');

      const response = await fetch(`${SERVER_URL}/expenseByCategory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log(result);


      if (result) {
        const labels = result.map(item => item._id);
        const values = result.map(item => item.mergedValues.total);

        const newChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Expenses',
              data: values,
              backgroundColor: [
                '#58508d',
                '#895295',
                '#b8518f',
                '#df557e',
                '#f86564',
                '#ff8145',

              ],
              borderWidth: 1.5,
              borderColor: 'rgb(17, 20, 24)',
            },
          ],
        };


        setChartdata(newChartData);
      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchweekData = async () => {
    try {
      const token = getCookie('token');

      const response = await fetch(`${SERVER_URL}/weeklytransaction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log("week", result.data);


      if (result.data) {
        const labels = result.data.map(item => item.date);
        const expensevalues = result.data.map(item => item.totalExpense);
        const incomevalues = result.data.map(item => item.totalIncome);

        const newChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Expense',
              data: expensevalues,
              // fill:true,
              borderColor: 'rgb(248, 113, 113)',
              backgroundColor: 'rgb(248, 113, 113)',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 2,
            },
            {
              label: 'Income',
              data: incomevalues,
              // fill:true,
              borderColor: 'rgb(74, 222, 128)',
              backgroundColor: 'rgb(74, 222, 128)',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 2,
            },
          ],
        };

        setWeekdata(newChartData);

      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchmonthData = async () => {
    try {
      const token = getCookie('token');

      const response = await fetch(`${SERVER_URL}/monthlytransaction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log("month", result.data);


      if (result.data) {
        const labels = result.data.map(item => item.month);
        const expensevalues = result.data.map(item => item.totalExpense);
        const incomevalues = result.data.map(item => item.totalIncome);

        const newChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Expense',
              data: expensevalues,
              borderColor: 'rgb(248, 113, 113)',
              backgroundColor: '#000',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 2,
            },
            {
              label: 'Income',
              data: incomevalues,
              borderColor: 'rgb(74, 222, 128)',
              backgroundColor: '#000',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 2,
            },
          ],
        };

        setMonthdata(newChartData);

      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  const fetchyearData = async () => {
    try {
      const token = getCookie('token');

      const response = await fetch(`${SERVER_URL}/yearlytransaction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log("year", result.data);


      if (result.data) {
        const labels = result.data.map(item => item.year);
        const expensevalues = result.data.map(item => item.totalExpense);
        const incomevalues = result.data.map(item => item.totalIncome);

        const newChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Expense',
              data: expensevalues,
              borderColor: 'rgb(248, 113, 113)',
              backgroundColor: '#000',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 2,
            },
            {
              label: 'Income',
              data: incomevalues,
              borderColor: 'rgb(74, 222, 128)',
              backgroundColor: '#000',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 2,
            },
          ],
        };

        setYeardata(newChartData);

      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const doughnutoptions = {
    plugins: {
      legend: {
        position: 'right', // Position the legend on the right
        labels: {
          color: 'white',
        }
      },
    },
  }


  const lineoptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 600,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#777',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: '#fff',
        },
        ticks: {
          color: '#ffffff',
        },
        centerLabels: true,
      },
      y: {
        grid: {
          display: false,
          color: '#000',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };


  console.log('chartData:', chartdata);

  return (
    <div className='text-white ml-60 my-16'>
      <div className='flex flex-col pl-28 pr-48 pb-10'>
        <div className="flex flex-wrap justify-between gap-3">
          <p className="text-[32px] font-bold leading-tight min-w-72">Charts</p>
        </div>

        <div className='py-4'>
          <div className=' text-lg py-0'>Category-wise spendings</div>
          <div className='flex justify-center '>
            {chartdata ? (
              <div className='w-[400px] h-[400px] ml-20'><Doughnut data={chartdata} options={doughnutoptions} /></div>
            ) : (
              <p>No available data</p>
            )}
          </div>
        </div>


        <div className='py-4 h-96'>
          <div className=' text-lg py-0'>Weekly spendings</div>
          <div className='flex justify-center py-6 w-full h-80'>
            {weekdata ? (
              <div className=''><Line data={weekdata} options={lineoptions}  /></div>
            ) : (
              <p>No available data</p>
            )}
          </div>
        </div>



        <div className='py-4'>
          <div className=' text-lg py-0'>Monthly spendings</div>
          <div className='flex justify-center py-6 w-full h-80'>
            {monthdata ? (
              <div className=''><Line data={monthdata} options={lineoptions}  /></div>
            ) : (
              <p>No available data</p>
            )}
          </div>
        </div>


        <div className='py-4'>
          <div className=' text-lg py-0'>Yearly spendings</div>
          <div className='flex justify-center py-6 w-full h-80'>
            {yeardata ? (
              <div className=''><Line data={yeardata} options={lineoptions}  /></div>
            ) : (
              <p>No available data</p>
            )}
          </div>
        </div>



      </div>
    </div>
  );
};


export default Chartpage;
