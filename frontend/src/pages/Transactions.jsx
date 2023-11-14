import React from 'react';

import CTAButton from "../components/core/Homepage/Button"


const Dashboard = () => {
  return (
   <div>
    <div className='text-stone-300 flex items-center justify-start '>
     <h1 className='text-3xl m-auto mt-10'> Dashboard</h1>
    </div>
     {/* Section1 => buttons*/}

     <div className='flex flex-row m-5 p-6 items-center justify-center'>
     <CTAButton  linkto={"/balance"} className="flex items-center justify-between">
     <h1 className='text-4xl mt-5'> Balance</h1>
      <p className='mt-16 text-2xl'>---</p>
     </CTAButton>

     <CTAButton  linkto={"/income"}>
     <h1 className='text-4xl mt-5'> Income</h1>
      <p className='mt-16 text-2xl'>---</p>
     </CTAButton>

     <CTAButton  linkto={"/expenses"}>
     <h1 className='text-4xl mt-5'> Expenses</h1>
      <p className='mt-16 text-2xl'>---</p>
      </CTAButton>

     <CTAButton  linkto={"/savings"}>
     <h1 className='text-4xl mt-5'> Savings</h1>
      <p className='mt-16 text-2xl'>---</p>
      </CTAButton>
    
      </div>
    
                {/* Section3 => Transactions history*/}
          <div className='text-stone-300    border-b-[1px] border-b-blue-500 '>
            <h2 className='text-3xl m-auto mt-10 ml-24 '> Recent Transactions</h2>
          </div>

      </div>
    
  
  );
};

export default  Dashboard;

