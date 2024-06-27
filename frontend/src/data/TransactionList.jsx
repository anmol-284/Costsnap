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
    fetchtransactions();
  }, []);

  const fetchtransactions = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');


    fetch('http://localhost:8000/api/v1/getalltransactions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }

  const handleDelete = (transactionId) => {

    const token = document.cookie.replace(/(?:(?:^|.;\s)token\s*=\s*([^;]).$)|^.*$/, '$1');

    fetch(`http://localhost:8000/api/v1/deletetransaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {

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
            className="flex gap-4 mx-4 py-3 justify-between border-b border-[#3c4753]">
            {/* <button className="text-red-500" onClick={() => handleDelete(transaction._id)}> Delete </button> */}
            <div class="flex items-start gap-4">
              <div class="text-white flex items-center justify-center rounded-lg bg-[#293038] shrink-0 size-40" data-icon="CreditCard" data-size="32px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-1 flex-col justify-center">
                <p class="text-white text-base font-medium leading-normal">{transaction.transactionname}</p>
                <p class="text-[#9dabb8] text-sm font-normal leading-normal">Transaction ID: {transaction.createdAt}</p>
                <p class="text-[#9dabb8] text-sm font-normal leading-normal">Category: {transaction.category}</p>
              </div>
            </div>
            <div class="shrink-0"><p class="text-white text-base font-normal leading-normal">


              {transaction.amount}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
