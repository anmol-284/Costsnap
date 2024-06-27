import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Investments = () => {

  const [investments, setInvestments] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    transactiontype: '', // New entry for transaction type
    stockname: '',
    unitprice: '',
    amount: '',
    createdAt: '',
  });

  useEffect(() => {
   fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // Fetch transactions from the backend API

    fetch('http://localhost:8000/api/v1/getinvestment', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setInvestments(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }

  if (!Array.isArray(investments.holdings)) {
    return <div className='text-green-600 text-2xl m-auto'>No transaction found</div>;
  }

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
      // const newInvestments = { ...formData };
      // setInvestments([...investments, newInvestments]);


      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      console.log(formData);

      const response = await fetch('http://localhost:8000/api/v1/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log('Backend response:', result);

      fetchInvestments();

      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsFormVisible(false);
    }
  };


  return (

    <div className='text-white w-auto ml-60 my-16'>


      <div className='flex flex-col pl-24 pr-48 pb-10'>
        <div className="flex flex-wrap justify-between gap-3">
          <p className="text-white text-[32px] font-bold min-w-72">Portfolio</p>
        </div>
        <div className="flex justify-between pt-4 pb-4">
          <h3 className="text-white text-lg font-bold">Total balance</h3>
          <div className='flex justify-around gap-3'>
            <button onClick={handleAddTransactionClick} className='bg-[#293038] text-sm pl-4 pr-4 py-2 text-white rounded-xl shadow-md hover:bg-gray-600'>Add Transaction</button>
            
            <Link to={"/viewtransaction"}>
              <button className='bg-[#293038] text-sm pl-4 pr-4 py-2 text-white rounded-xl shadow-md hover:bg-gray-600'>View Transaction</button>
            </Link>

          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#293038]">
          {investments && investments.holdings && (
            <div>
              <p className="text-white text-base font-medium ">{investments.totalinvestment.toFixed(2)}</p>
              <p className="text-white text-2xl font-bold ">12,000</p>
            </div>
          )}
        </div>
      </div>



      <div className='flex flex-col overflow-hidden rounded-xl border border-[#3c4753] ml-24 mr-48'>

        <div className='grid grid-cols-6 auto-cols-fr bg-[#1c2126]'>

          <div className='text-md font-medium px-4 py-3'>Stock</div>
          <div className='text-md font-medium px-4 py-3'>Price</div>
          <div className='text-md font-medium px-4 py-3'>Quantity</div>
          <div className='text-md font-medium px-4 py-3'>Value</div>
          <div className='text-md font-medium px-4 py-3'>Current</div>
          <div className='text-md font-medium px-4 py-3'>P/L</div>

        </div>

        {Array.isArray(investments.holdings) && investments.holdings.map((holding) => (
          <div key={holding._id} className='grid grid-cols-6 border-t border-t-[#3c4753]'>

            <p className='px-4 py-4 text-white text-sm'>{holding.stockname}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{holding.averageprice.toFixed(2)}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{holding.units.toFixed(2)}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{holding.amount.toFixed(2)}</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>10000</p>
            <p className='px-4 py-4 text-[#9dabb8] text-sm'>{10000 - holding.amount.toFixed(2)}</p>

          </div>
        )
        )}
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

              <label className="font-semibold">Stock Name:</label>
              <input
                type="text"
                name="stockname"
                value={formData.stockname}
                onChange={handleInputChange}
                placeholder="Ex.Tata, Adani"
                className="form-input border rounded p-2 bg-[#293038] focus:outline-none "
              />


              <label className="font-semibold">Unit Price:</label>
              <input
                type="number"
                name="unitprice"
                value={formData.unitprice}
                onChange={handleInputChange}
                placeholder="Ex. 100"
                className="form-input border rounded p-2 text-sm bg-[#293038] focus:outline-none "
              />

              <label className="font-semibold">Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Ex. 100"
                className="form-input border rounded p-2 text-sm bg-[#293038] focus:outline-none "
              />

              <label className="font-semibold">Transaction Type:</label>
              <select
                name="transactiontype"
                value={formData.transactiontype}
                onChange={handleInputChange}
                className="border rounded p-2 bg-[#293038] focus:outline-none "
              >
                <option value="" disabled>Select type</option>
                <option value="buy" className='hover:bg-gray-400'>Buy</option>
                <option value="sell">Sell</option>
              </select>

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

  )
}

export default Investments
