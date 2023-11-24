
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getTokenFromCookie() {
  // Split the cookie string and find the token value
  const cookieArray = document.cookie.split('; ');
  const tokenCookie = cookieArray.find(cookie => cookie.startsWith('token='));

  if (tokenCookie) {
    // Extract the token value from the cookie
    const tokenValue = tokenCookie.split('=')[1];
    return tokenValue;
  }

  return null; // Return null if the token is not found
}

const TransactionList = () => {
  const token = getTokenFromCookie();
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
    <div className=''>
      <div className="text-lg gap-4">
        {Array.isArray(transactions) && transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="grid grid-cols-4 p-2">
            <p className="text-neutral-200">{transaction.createdAt}</p>
            <p className="text-gray-200">{transaction.transactionname}</p>
            <p className="text-lg text-gray-400">{transaction.category}</p>
            <p className="text-lg text-green-600">{transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
