import React from 'react';
import TransactionList from '../data/TransactionList';
import PieChart from './PieChart';

import { useState, useEffect } from 'react';

const Transactions = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    createdAt: '',
    transactionname: '',
    category: '',
    amount: '',
    transactiontype: '', // New entry for transaction type
  });
  const [transactions, setTransactions] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetchtransactions();
  }, []);

  const fetchtransactions = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');


    fetch(`${SERVER_URL}/getalltransactions`, {
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

    fetch(`${SERVER_URL}/deletetransaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {

        if (response.success) {
          fetchtransactions();
        } else {
          console.error('Error deleting transaction :', response.message);
        }
      })
      .catch((error) => console.error('Error deleting transaction:', error));
  };

  const handleAddTransactionClick = () => {
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsFormVisible(false);

    try {

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      console.log(formData);

      const response = await fetch(`${SERVER_URL}/makeTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log('Backend response:', result);

      fetchtransactions();

      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsFormVisible(false);
    }
  };

  return (
    <div className="ml-60 my-16">

    


      <div className="layout-content-container flex flex-col  flex-1 pl-24 pr-60">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p class="text-white text-[32px] font-bold leading-tight min-w-72">Your
            transactions</p>
        </div>
        <div className="flex gap-3 p-3 overflow-x-hidden justify-between">
          <div className='flex gap-2'>
            <div
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#293038] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">All</p>
            </div>
            <div
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#293038] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">Income</p>
            </div>
            <div
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#293038] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">Expense</p>
            </div>
          </div>
          <button
            className="bg-[#293038] text-sm pl-4 pr-4 text-white rounded-xl shadow-md hover:bg-gray-600"
            onClick={handleAddTransactionClick}
          >
            Add Transaction
          </button>

        </div>
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#9dabb8] flex border-none bg-[#293038] items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                  fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                  </path>
                </svg>
              </div>
              <input placeholder="Search all transactions"
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-full placeholder:text-[#9dabb8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

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


              {(transaction.transactiontype == "Income") ? (<div className='text-green-400'>+{transaction.amount}</div>) : (<div className='text-red-400'>-{transaction.amount}</div>)}</p></div>
          </div>
        ))}

      </div>




      {isFormVisible && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-[#111418] p-8 shadow-md w-96 rounded-md backdrop-blur-sm">
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
              <label className="font-semibold">Date:</label>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleInputChange}
                className="border rounded p-2 bg-[#293038] focus:outline-none "
              />

              <label className="font-semibold">Description:</label>
              <input
                type="text"
                name="transactionname"
                value={formData.transactionname}
                onChange={handleInputChange}
                placeholder="Ex.Canteen, Movie"
                className="form-input border rounded p-2 bg-[#293038] focus:outline-none "
              />

              <label className="font-semibold">Transaction Type:</label>
              <select
                name="transactiontype"
                value={formData.transactiontype}
                onChange={handleInputChange}
                className="border rounded p-2 bg-[#293038] focus:outline-none "
              >
                <option value="" disabled>Select type</option>
                <option value="Expense" className='hover:bg-gray-400'>Expense</option>
                <option value="Income">Income</option>
              </select>

              {(formData.transactiontype === 'Expense') && (
                <div className='flex flex-col gap-2'>
                  <label className="font-semibold">Category:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border rounded p-2 bg-[#293038] focus:outline-none "
                  >
                    <option value="" disabled>Select type</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
              )}

              <label className="font-semibold">Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Ex. 100"
                className="form-input border rounded p-2 text-sm bg-[#293038] focus:outline-none "
              />



              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="bg-[#293038] text-white px-4 py-2 rounded-xl shadow-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-md hover:bg-gray-400"
                >
                  Submit
                </button>

              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
