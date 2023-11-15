import React from 'react';
import TransactionList from '../data/TransactionList';


const Transactions = () => {
 

  return (
   <div>
     {/* Section 1 => Transactions history*/}
          <div className='text-stone-300 w-[100vw]   border-b-[1px] border-b-blue-500 '>
            <h2 className='text-3xl mb-2 mt-10 ml-24 '> Recent Transactions</h2>
          </div>


        {/* Section 2 => Transactions Grid */}

        {/* <div className='grid grid-cols-5  m-5  gap-x-2 gap-y-2 grid-flow-row-dense'>
              <div className='bg-red-500 rounded-lg shadow-xl min-h-[50px] col-span-5'/>
              <div className='bg-red-500 rounded-lg shadow-xl min-h-[50px] row-span-2'/>
              <div className='bg-red-500 rounded-lg shadow-xl min-h-[50px] col-span-5 row-span-2'/>
             

        </div> */}

          <div>
           {/* Transactions heading */}
           <div className='text-neutral-200 text-lg font-bold grid grid-cols-4  m-7 pl-16 pr-20 grid-flow-row-dense  '>
            <span><h2>Date</h2></span>
              <span><h2>Description</h2></span>
             <span><h2>Amount</h2></span>
             <span><h2>Status</h2></span>
             
           </div>
           
           <TransactionList/>

          </div>

      </div>
    
  
  );
};

export default Transactions;

