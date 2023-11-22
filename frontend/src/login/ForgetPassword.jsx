import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
  
    const [error, setError] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('/api/login', { email });
        console.log(response.data); // Handle success
      } catch (err) {
        setError('Invalid credentials'); // Handle error
      }
    };
  return (
  
    <div>
      
      <div className="  mt-[170px] ml-[400px] p-10 bg-white shadow-md rounded w-[450px] h-[230px] m-[100px]">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
         Submit
        </button>
      </div>
     
      {/* <Link to={"/confirmpassword"}  >
          <p className='text-center mt-3 text-zinc-600'>confirm Password</p>
        </Link> */}
    </div>
  )
}

export default ForgetPassword
