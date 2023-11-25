import React, { useState } from 'react';

const AddTransaction = () => {
  const [transactiontype, setTransactiontype] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [stockname, setStockname] = useState('');
  const [unitprice, setUnitprice] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAddTransaction = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    try {
      const response = await fetch('http://localhost:8000/api/v1/stock', {
        method: 'POST',
        headers: {
          'Authorisation':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactiontype,
          stockname,
          unitprice,
          amount,
          createdAt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Transaction added successfully:', responseData);
    } catch (err) {
      setError('Add Transaction failed'); // Handle error
      console.error('Error adding transaction:', err.message);
    }
  };

  return (
      <div className='text-white'>
        <div className='text-stone-300 w-[100vw] border-b-[1px] border-b-blue-500 '>
          <h2 className='text-3xl mb-2 mt-5 ml-60 '> Add a Transaction</h2>
        </div>
  
        <div className="m-auto p-10 bg-white shadow-md rounded w-[450px] h-[600px] mt-2 ">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Transaction Type :</label>
            <select
              className="w-full p-2 border rounded text-black"
              value={transactiontype}
              onChange={(e) => setTransactiontype(e.target.value)}
            >
              <option value="">Select Transaction Type</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">TimeStamp :</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded text-black"
              placeholder="Date & Time"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Stock Name :</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black"
              placeholder="Enter Stock Name"
              value={stockname}
              onChange={(e) => setStockname(e.target.value)}
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Unit Price :</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-black"
              placeholder="Enter Unit Price"
              value={unitprice}
              onChange={(e) => setUnitprice(e.target.value)}
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Amount :</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-black"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
  
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            onClick={handleAddTransaction}
          >
            Submit
          </button>
        </div>
      </div>
    );
};

export default AddTransaction;
