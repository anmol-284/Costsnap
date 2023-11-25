import React, { useState, useEffect } from 'react';
import CTAButton from '../components/core/Button';

const Investments = () => {

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // Fetch transactions from the backend API
    
    fetch('http://localhost:8000/api/v1/getinvestment',{
      method:'GET',
      headers: {
        'Authorisation': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setInvestments(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  if (!Array.isArray(investments.holdings)) {
    return <div className='text-green-600 text-2xl m-auto'>No transaction found</div>;
  }


  return (
    
    <div className='text-white w-auto ml-60'>

      {/* section => heading */}
      <div className='text-stone-300 w-[100vw]   border-b-[1px] border-b-blue-500 '>
        <h2 className='text-5xl mb-2 mt-10 ml-12 '> Investments</h2>
      </div>

      {/* section => Buttons   */}
      <div className='flex flex-row  mt-6'>
        <CTAButton linkto={"/addtransaction"} className='w-40 h-10 bg-gray-400 rounded-md ml-12 p-2'>Add Transaction</CTAButton>
        <CTAButton linkto={"/viewtransaction"} className='w-40 h-10 bg-gray-400 rounded-md ml-12'>View Transaction</CTAButton>
      </div>

      <div className='w-auto'>
        <h2 className='text-4xl m-12'>Portfolio Performance</h2>
      </div>



      <div className=''>

        {/* Transactions heading */}
        <div className='grid grid-cols-4 '>

          <div className='ml-12 p-4 text-lg '>Total Paid in </div>
          <div className='ml-12 p-4 text-lg'>Current Portfolio Value</div>
          <div className='ml-12 p-4 text-lg'>Change in Value</div>
          <div className='ml-12 p-4 text-lg'>Return in value(absolute)</div>

        </div>

        {investments && investments.holdings && (
          <div key={investments._id} className='grid grid-cols-4 text-neutral-200'>


            <p className='ml-12 p-4 text-2xl'>{investments.totalinvestment.toFixed(2)}</p>


            <p className='ml-12 p-4 text-2xl'>45000</p>


            <p className='ml-12 p-4 text-2xl'>45000-{investments.totalinvestment.toFixed(2)}</p>


            <p className='ml-12 p-4 text-2xl'>12%</p>

          </div>

        )}

      </div>


      <div className='w-auto'>
        <h2 className='text-4xl m-12'>Your Holdings</h2>
      </div>

      <div className='flex flex-col '>

        <div className='grid grid-cols-9 auto-cols-fr'>

          <div className='ml-12 p-2 text-lg'>Symbol</div>
          <div className='ml-12 p-2 text-lg'>Name</div>
          <div className='ml-12 p-2 text-lg'>Weight</div>
          <div className='ml-12 p-2 text-lg'>Units</div>
          <div className='ml-12 p-2 text-lg'>Unit Price</div>
          <div className='ml-12 p-2 text-lg'>Value</div>
          <div className='ml-12 p-2 text-lg'>Current</div>
          <div className='ml-12 p-2 text-lg'>Rate of Return(Absolute)</div>

        </div>

        {Array.isArray(investments.holdings) && investments.holdings.map((holding) => (
          <div key={holding._id} className='grid grid-cols-9'>


            <p className='ml-12 p-2'>Tata steel</p>
            <p className='ml-12 p-2 '>{holding.stockname}</p>
            <p className='ml-12 p-2'>30</p>
            <p className='ml-12 p-2 '>{holding.units.toFixed(2)}</p>
            <p className='ml-12 p-2 '>{holding.averageprice.toFixed(2)}</p>
            <p className='ml-12 p-2 '>{holding.amount.toFixed(2)}</p>
            <p className='ml-12 p-2'>10000</p>
            <p className='ml-12 p-2'>1000</p>

          </div>
        )
        )}


      </div>

      <div className='mb-20'></div>

    </div>

  )
}

export default Investments
