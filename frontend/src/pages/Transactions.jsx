import React from 'react';
import TransactionList from '../data/TransactionList';
import PieChart from './PieChart';

import React, { useState } from 'react';

const Transactions = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
    transactiontype: '', // New entry for transaction type
  });
  const [transactions, setTransactions] = useState([]);

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
      // Update frontend transactions list
      const newTransaction = { ...formData };
      setTransactions([...transactions, newTransaction]);

      // Send data to the backend
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

      const response = await fetch('http://localhost:8000/api/v1/addTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log('Backend response:', result);

      // Close the form
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsFormVisible(false);
    }
  };

  return (
    <div className="ml-60 p-8">
      {/* Section 1 => Transactions history */}
      <div className="text-stone-300 mb-6 border-b border-blue-500 ">
        <h2 className="text-3xl mt-10">Transactions</h2>
      </div>

          <PieChart/>
          
          <div>
           {/* Transactions heading */}
           <div className='text-neutral-200 text-lg font-semibold grid grid-cols-4  m-2 pl-16 pr-20 grid-flow-row-dense  '>
            <span><h2>Date</h2></span>
              <span><h2>Description</h2></span>
             <span><h2>Category</h2></span>
             <span><h2>Amount</h2></span>
             <span><h2>Category</h2></span>
             
           </div>
           
           <TransactionList/>

          </div>

      </div>

      {/* Add Transaction Form */}
      {isFormVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md w-96 rounded-md">
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
            <label className="text-sm font-semibold">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border rounded p-2 focus:outline-none focus:border-blue-500"
            />

            <label className="text-sm font-semibold">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border rounded p-2 focus:outline-none focus:border-blue-500"
            />

            <label className="text-sm font-semibold">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border rounded p-2 focus:outline-none focus:border-blue-500"
            />

            <label className="text-sm font-semibold">Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="border rounded p-2 focus:outline-none focus:border-blue-500"
            />

            {/* New input for Transaction Type */}
            <label className="text-sm font-semibold">Transaction Type:</label>
            <select
              name="transactiontype"
              value={formData.transactiontype}
              onChange={handleInputChange}
              className="border rounded p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Select type</option>
              <option value="Income">Income</option>
              <option value="Spend">Spend</option>
            </select>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transactions;
