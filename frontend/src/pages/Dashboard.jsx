import { React, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getCookie } from '../components/utils';


const Dashboard = () => {
  const [weekdata, setWeekdata] = useState(null);
  const [monthexpense, setMonthexpense] = useState(0);
  const [monthincome, setMonthincome] = useState(0);
  const [recenttransactions, setRecenttransactions] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetchweekData();
    fetchmonthData();
    fetchrecenttransactions();
  }, []);

  const fetchrecenttransactions = async () => {
    try {
      const token = getCookie('token');

      const response = await fetch(`${SERVER_URL}/recenttransactions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json();

      console.log(result);

      setRecenttransactions(result.data);

    } catch (error) {
      console.error("Error fetching recent transactions", error);
    }

  }

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
        const expensevalues = result.data.map(item => item.totalExpense);
        const incomevalues = result.data.map(item => item.totalIncome);

        setMonthexpense(expensevalues);
        setMonthincome(incomevalues);


      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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



  return (
    <div className="ml-60 my-16">

      <div className="layout-content-container flex flex-col pl-28 pr-60">
        <div className="flex flex-wrap justify-between gap-3 pr-4 pb-4">
          <p class="text-white text-[32px] font-bold leading-tight min-w-72">Dashboard</p>
        </div>
        <div className="flex flex-col gap-3 py-3 overflow-x-hidden justify-between">
          <div className='text-lg text-white'>
            Current month snap
          </div>
          <div className='flex gap-12'>
            <div
              className="flex flex-col w-36 shrink-0 justify-center rounded-md bg-gray-950 border border-gray-800 px-4 py-2">
              <div className="text-gray-300 text-sm font-medium leading-normal">Expense</div>
              <div className="text-white text-xl font-medium leading-normal">Rs.{monthexpense}</div>
            </div>
            <div
              className="flex flex-col w-36 shrink-0 justify-center rounded-md bg-gray-950 border border-gray-800 px-4 py-2">
              <div className="text-gray-300 text-sm font-medium leading-normal">Income</div>
              <div className="text-white text-xl font-medium leading-normal">Rs.{monthincome}</div>
            </div>

          </div>

        </div>

        <div className='py-4'>
          <div className=' text-lg text-white'>Weekly spendings</div>
          <div className='flex justify-center py-6 w-full h-80'>
            {weekdata ? (
              <div className=''><Line data={weekdata} options={lineoptions} /></div>
            ) : (
              <p>No available data</p>
            )}
          </div>
        </div>

        <div className='py-4'>
          <div className=' text-lg text-white pb-2'>Recent transactions</div>
          <div className='flex flex-col justify-center '>
            {!Array.isArray(recenttransactions) && (
            <div>
              No recent transactions
            </div>
            )}
            {Array.isArray(recenttransactions) && recenttransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex gap-4 mr-4 py-3 justify-between border-b border-[#3c4753]">
            <div class="flex items-start gap-4">
              <div class="text-white flex items-center justify-center rounded-xl bg-[#293038] shrink-0 size-40" data-icon="CreditCard" data-size="16px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  {/* <path
                    d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"
                  ></path> */}
                </svg>
              </div>
              <div class="flex flex-1 flex-col justify-center">
                <p class="text-white text-md font-normal leading-normal">{transaction.transactionname}</p>
                <p class="text-[#9dabb8] text-sm font-normal leading-normal">Date: {new Date(transaction.createdAt).toLocaleDateString()}</p>
                <p class="text-[#9dabb8] text-sm font-normal leading-normal">Category: {transaction.category}</p>
              </div>
            </div>
            <div class="shrink-0"><p class="text-white text-base font-normal leading-normal">


              {(transaction.transactiontype === "Income") ? (<div className='text-green-400'>+{transaction.amount}</div>) : (<div className='text-red-400'>-{transaction.amount}</div>)}</p></div>
          </div>
        ))}
        </div>
      </div>

      {/* {Array.isArray(transactions) && transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex gap-4 mx-4 py-3 justify-between border-b border-[#3c4753]">
            {/* <button className="text-red-500" onClick={() => handleDelete(transaction._id)}> Delete </button> */}
      {/* <div class="flex items-start gap-4">
              <div class="text-white flex items-center justify-center rounded-lg bg-[#293038] shrink-0 size-40" data-icon="CreditCard" data-size="32px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-1 flex-col justify-center">
                <p class="text-white text-base font-medium leading-normal">{transaction.transactionname}</p>
                <p class="text-[#9dabb8] text-sm font-normal leading-normal">Date: {new Date(transaction.createdAt).toLocaleDateString()}</p>
                <p class="text-[#9dabb8] text-sm font-normal leading-normal">Category: {transaction.category}</p>
              </div>
            </div>
            <div class="shrink-0"><p class="text-white text-base font-normal leading-normal">


              {(transaction.transactiontype == "Income") ? (<div className='text-green-400'>+{transaction.amount}</div>) : (<div className='text-red-400'>-{transaction.amount}</div>)}</p></div> */}
      {/* </div> */}
      {/* ))}  */}

    </div>

    </div >


  );
};

export default Dashboard;
