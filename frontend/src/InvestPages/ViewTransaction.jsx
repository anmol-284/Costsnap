import React, { useState, useEffect } from 'react';

const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const transactionsData = await response.json();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Transactions not found:', error.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='text-white'>
      <div className='text-stone-300 w-[100vw] border-b-[1px] border-b-blue-500 '>
        <h2 className='text-3xl mb-2 mt-10 ml-24 '> Transaction History</h2>
      </div>

      {/* Transactions heading */}
      <div className='text-neutral-200 text-lg grid grid-cols-5 m-5 pl-10 pr-[350px]'>
        <span><h2>Transaction Type</h2></span>
        <span><h2>TimeStamp</h2></span>
        <span><h2>Stock Name</h2></span>
        <span><h2>Unit Price</h2></span>
        <span><h2>Amount</h2></span>
      </div>

      {transactions.map((transaction) => (
        <div key={transaction._id} className='text-neutral-200 text-lg grid grid-cols-5 m-5 pl-10 pr-[350px]'>
          <p>{transaction.transactiontype}</p>
          <p>{transaction.timestamp}</p>
          <p>{transaction.stockname}</p>
          <p>{transaction.unitprice}</p>
          <p>{transaction.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewTransaction;
