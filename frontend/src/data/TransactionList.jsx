import React, { useState, useEffect } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/getalltransactions');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const transactionData = await response.json();
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="text-neutral-200 text-lg  grid grid-cols-4  m-7 pl-16 pr-20 grid-flow-row-dense ">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white p-4 border rounded shadow-md"
          >
            <span><p>{transaction.date}</p></span>
            <span><p className="text-gray-700">{transaction.description}</p></span>
            <span><p className="text-lg font-semibold text-green-600">  ${transaction.amount} </p></span>
            <span><p>{transaction.Category}</p></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
