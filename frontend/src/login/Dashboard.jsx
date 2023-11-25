import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CTAButton from "../components/core/Homepage/Button"
import {AiOutlineDollar} from 'react-icons/fa';
import FinancialChart from '../data/FinancialChart';

const Dashboard = () => {
  return (
   <div className='ml-60  mr-60'>
    <div className='text-stone-300 flex items-center justify-start'>
     <h1 className='text-3xl m-auto mt-10'> Dashboard</h1>
    </div>
     {/* Section1 => buttons*/}

     <div className='flex flex-row m-4 p-6 items-center justify-center'>
     <CTAButton  linkto={"/balance"} className="flex items-center justify-between">
      <p className='mt-16 text-4xl'>$3,596</p>
     <p className='text-2xl mt-5'> Balance</p>
     </CTAButton>

     <CTAButton  linkto={"/income"}>
     <h1 className='text-4xl mt-5'> Income</h1>
      <p className='mt-16 text-2xl'>$421</p>
     </CTAButton>

     <CTAButton  linkto={"/expenses"}>
     <h1 className='text-4xl mt-5'> Expenses</h1>
      <p className='mt-16 text-2xl'>$164</p>
      </CTAButton>

     <CTAButton  linkto={"/savings"}>
     <h1 className='text-4xl mt-5'> Savings</h1>
      <p className='mt-16 text-2xl'>$257</p>
      </CTAButton>
    
      </div>
     {/* Section2 => graphs*/}
      {/* <div>
        <FinancialChart/>
      </div> */}

     {/* Section3 => Transactions history*/}

      </div>
    
  
  );
};

export default  Dashboard;
