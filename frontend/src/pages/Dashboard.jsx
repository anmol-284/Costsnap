import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="ml-60 my-16">

      <div className="layout-content-container flex flex-col  flex-1 pl-24 pr-60">
        <div className="flex flex-wrap justify-between gap-3 px-4 pb-4">
          <p class="text-white text-[32px] font-bold leading-tight min-w-72">Dashboard</p>
        </div>
        <div className="flex gap-3 p-3 overflow-x-hidden justify-between">
          <div className='flex gap-12'>
            <div
              className="flex flex-col h-12 shrink-0 justify-center rounded-xl bg-[#293038] p-8">
              <div className="text-white text-lg font-medium leading-normal">Rs.4500</div>
              <div className="text-gray-300 text-sm font-medium leading-normal">Expense</div>
            </div>
            <div
              className="flex flex-col h-12 shrink-0 justify-center rounded-xl bg-[#293038] p-8">
              <div className="text-white text-lg font-medium leading-normal">Rs.4500</div>
              <div className="text-gray-300 text-sm font-medium leading-normal">Income</div>
            </div>
            
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

    </div>


  );
};

export default Dashboard;
