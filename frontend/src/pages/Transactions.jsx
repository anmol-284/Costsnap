import React from 'react';
import TransactionList from '../data/TransactionList';
import PieChart from './PieChart';


const Transactions = () => {
 

  return (
   <div>
     {/* Section 1 => Transactions history*/}
          <div className='text-stone-300 w-[100vw]   border-b-[1px] border-b-blue-500 '>
            <h2 className='text-3xl mb-2 mt-10 ml-24 '> Recent Transactions</h2>
          </div>

          <PieChart/>
          
          <div>
           {/* Transactions heading */}
           <div className='text-neutral-200 text-lg font-bold grid grid-cols-4  m-7 pl-16 pr-20 grid-flow-row-dense  '>
            <span><h2>Date</h2></span>
              <span><h2>Description</h2></span>
             <span><h2>Amount</h2></span>
             <span><h2>Category</h2></span>
             
           </div>
           
           <TransactionList/>

          </div>

      </div>
    
  
  );
};

export default Transactions;

