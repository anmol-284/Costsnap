import React, { useState } from 'react';
import axios from 'axios';

const ConfirmPassword = () => {

    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('/api/login', { newpassword,confirmpassword });
        console.log(response.data); // Handle success
      } catch (err) {
        setError('Invalid credentials'); // Handle error
      }
    };
  return (
    <div>
      
      <div className="  mt-[170px] ml-[400px] p-10 bg-white shadow-md rounded w-[450px] h-[330px] m-[100px]">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">New password(min eight characters)</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter new password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          </div>

          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>

          <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
         Submit
        </button>
      </div>

    </div>
  )
}

export default ConfirmPassword
