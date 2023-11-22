
import React, { useState, useEffect } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // Fetch transactions from the backend API
    fetch('http://localhost:8000/api/v1/getalltransactions',{
      method:'GET',
      headers: {
        'Authorisation': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className='ml-10'>
      {/* <h2 className="text-2xl font-bold mb-4">Transaction List</h2> */}
      <div className="text-neutral-200 text-lg gap-4">
  {Array.isArray(transactions) && transactions.map((transaction) => (
    <div
      key={transaction._id}
      className="grid grid-cols-4 p-2 shadow-md">
      <p>{transaction.createdAt}</p>
      <p className="text-gray-200">{transaction.transactionname}</p>
      <p className="text-lg text-gray-400">{transaction.category}</p>
      <p className="text-lg text-green-600">${transaction.amount}</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default TransactionList;
