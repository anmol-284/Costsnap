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
    fetch('http://localhost:8000/api/v1/getalltransactions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
    }, []);

    const handleDelete = (transactionId) => {
      // Delete a transaction with the given ID
      const token = document.cookie.replace(/(?:(?:^|.;\s)token\s*=\s*([^;]).$)|^.*$/, '$1');
  
      fetch(`http://localhost:8000/api/v1/deletetransaction/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // If the deletion was successful, update the transactions state
          if (response.success) {
            setTransactions((prevTransactions) =>
              prevTransactions.filter((transaction) => transaction._id !== transactionId)
            );
          } else {
            console.error('Error deleting transaction :', response.message);
          }
        })
        .catch((error) => console.error('Error deleting transaction:', error));
    };

    if (!Array.isArray(transactions)) {
      return <div className='text-green-600 text-2xl m-auto'>No transaction found</div>;
    }
    


  return (
    <div className=''>
      <div className="text-lg gap-2">
        {Array.isArray(transactions) && transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="grid grid-cols-5 p-2 text-center">
            <p className="text-neutral-200">{transaction.createdAt}</p>
            <p className="text-gray-200">{transaction.transactionname}</p>
            <p className="text-gray-400">{transaction.category}</p>
            <p className="text-green-600">{transaction.amount}</p>
            <button
                className="text-red-500"
                onClick={() => handleDelete(transaction._id)}
              >
                Delete
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
