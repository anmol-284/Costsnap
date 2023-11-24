import React, { useState, useEffect } from 'react';
import CTAButton from "../components/core/Button"
import axios from 'axios';

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch('/api/investments');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const investmentsData = await response.json();
        setInvestments(investmentsData);
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    const fetchHoldings = async () => {
      try {
        const response = await fetch('/api/holdings');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const holdingsData = await response.json();
        setHoldings(holdingsData);
      } catch (error) {
        console.error('Error fetching holdings:', error);
      }
    };

    fetchInvestments();
    fetchHoldings();
  }, []);


  return (
    <div className='text-white w-auto'>
     
     {/* section => heading */}
    <div className='text-stone-300 w-[100vw]   border-b-[1px] border-b-blue-500 '>
            <h2 className='text-3xl mb-2 mt-10 ml-24 '> Investments</h2>
          </div>

        {/* section => Buttons   */}

        <div className='flex flex-row  mt-6'>
        <CTAButton active={true} linkto={"/addtransaction"}>Add Transaction</CTAButton>

        <CTAButton active={false} linkto={"/viewtransaction"}>View Transaction</CTAButton>
     
      </div>

      <div className='w-auto'>
        <h2 className='text-2xl m-5'>Portfolio Performance</h2>
        </div>
       
     
   
      

           

      <div className='text-neutral-200 text-lg grid grid-cols-4 m-5 pl-10 pr-[350px]'>

      <h1 > Total Paid in </h1>
      <h1 >Current Portfolio Value</h1>
      <h1 >Change in Value</h1>
      <h1> Return in value(absolute)</h1>


</div>

{investments.map((investment) => (
       <div key={investment._id} className='text-neutral-200 text-lg grid grid-cols-4 m-5 pl-10 pr-[350px] '>

       
          <p className='bg-slate-900 ml-2 p-4 border rounded  border-dark text-2xl'>{investment.totalpaidin}</p>
       
       
         <p className='bg-slate-900  ml-1 p-4 border rounded  border-dark text-2xl'>{investment.currentportfoliovalue}</p>
      
        
        <p className='bg-slate-900  ml-1 p-4 border rounded  border-dark text-2xl'>{investment.changeinvalue}</p>
     
       
        <p className='bg-slate-900  ml-1 p-4 border rounded  border-dark text-2xl'>{investment.raturninvalue}</p>

       </div>

)
)}

  


      <div className='w-auto'>
        <h2 className='text-2xl m-5'>Your Holdings</h2>
        </div>

        

        <div className='text-neutral-200 text-lg grid grid-cols-8 m-5 pl-10 pr-[350px]'>

<div> <h1 className='text-2xl '>Symbol</h1></div>
<div><h1 className='text-2xl '>Name</h1></div>
<div><h1 className='text-2xl '>Weight</h1></div>
<div> <h1 className='text-2xl '>Units</h1></div>
<div> <h1 className='text-2xl '>Units Price </h1></div>
<div><h1 className='text-2xl '>Value</h1></div>
<div> <h1 className='text-2xl '>Current</h1></div>
<div> <h1 className='text-2xl  '>Return Rate</h1></div>

</div>

{holdings.map((holding) => (
       <div key={holding._id} className='text-neutral-200 text-lg grid grid-cols-8 m-5 pl-10 pr-[350px]'>

       
          <p >{holding.symbol}</p>
          <p>{holding.Name}</p>
          <p>{holding.Weight}</p>
          <p>{holding.units}</p>
          <p>{holding.unitsprice}</p>
          <p>{holding.value}</p>
          <p>{holding.current}</p>
          <p>{holding.rateofreturn}</p>
      
       </div>
       )
       )}
       

</div>

 
   
  )
}

export default Investments
