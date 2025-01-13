import React, { useState, useEffect } from 'react';
import { getCookie } from '../components/utils';
import { FaTrash } from 'react-icons/fa';

const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const SERVER_URL =  process.env.REACT_APP_SERVER_URL;
  
  useEffect(() => {
    const token = getCookie('token');

    fetch(`${SERVER_URL}/stocktransactionhistory`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = getCookie('token');

    fetch(`${SERVER_URL}/deletestocktransaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
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
    <div className='text-white ml-60 my-16'>
      <div className="flex flex-wrap justify-between gap-3 pl-24 pr-48 pb-4">
        <p className="text-white text-[32px] font-bold min-w-72">Transaction History</p>
      </div>

      <div  className='flex flex-col overflow-hidden rounded-xl border border-[#3c4753] ml-24 mr-48'>
        <div className='grid grid-cols-6 auto-cols-fr bg-[#1c2126]'>

          <div className='text-md font-medium px-4 py-3'>Date</div>
          <div className='text-md font-medium px-4 py-3'>Type</div>
          <div className='text-md font-medium px-4 py-3'>Stock</div>
          <div className='text-md font-medium px-4 py-3'>Price</div>
          <div className='text-md font-medium px-4 py-3'>Quantity</div>
          <div className='text-md font-medium px-4 py-3'>Value</div>

        </div>

        {transactions && transactions.map((transaction) => (
          <div key={transaction._id} className='grid grid-cols-6 border-t border-t-[#3c4753]'>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{new Date(transaction.createdAt).toLocaleDateString()}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{transaction.transactiontype}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{transaction.stockname}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{transaction.unitprice}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{transaction.amount/transaction.unitprice}</p>
            <div className='flex justify-between pr-6'>
            <p className='pl-4 py-4 text-[#9dabb8] text-sm'>{transaction.amount}</p>
            <button
              className="text-gray-500 px-0"
              onClick={() => handleDelete(transaction._id)}
            >
              <FaTrash size={16}></FaTrash>
            </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ViewTransaction;
