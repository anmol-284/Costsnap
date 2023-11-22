
import React, { useState, useEffect } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the backend API
    fetch('/api/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Transaction List</h2> */}
      <div className="text-neutral-200 text-lg  grid grid-cols-4  m-7 pl-16 pr-20 grid-flow-row-dense ">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white p-4 border rounded shadow-md" >
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
