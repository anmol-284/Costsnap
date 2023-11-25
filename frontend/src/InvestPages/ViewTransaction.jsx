import React, { useState, useEffect } from 'react';

const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    fetch('http://localhost:8000/api/v1/stocktransactionhistory', {
      method: 'GET',
      headers: {
        'Authorisation': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching stocktransactions:', error));
  }, []);

  const handleDelete = (transactionId) => {
    // Delete a transaction with the given ID
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    fetch(`http://localhost:8000/api/v1/deletestocktransaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Authorisation': `Bearer ${token}`,
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
    <div className='text-white ml-60'>
      <div className='text-stone-300 w-[100vw] border-b-[1px] border-b-blue-500 '>
        <h2 className='text-3xl mb-2 mt-10 ml-24 '> Transaction History</h2>
      </div>

      {/* Transactions heading */}
      <div className='text-neutral-200 text-lg grid grid-cols-6 text-center m-10'>
        <span><h2>Transaction Type</h2></span>
        <span><h2>TimeStamp</h2></span>
        <span><h2>Stock Name</h2></span>
        <span><h2>Unit Price</h2></span>
        <span><h2>Amount</h2></span>
      </div>

      {transactions && transactions.map((transaction) => (
        <div key={transaction._id} className='text-neutral-200 grid grid-cols-6 text-center m-10'>
          <p>{transaction.transactiontype}</p>
          <p>{transaction.createdAt}</p>
          <p>{transaction.stockname}</p>
          <p>{transaction.unitprice}</p>
          <p>{transaction.amount}</p>
          <button
            className="text-red-500"
            onClick={() => handleDelete(transaction._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ViewTransaction;
