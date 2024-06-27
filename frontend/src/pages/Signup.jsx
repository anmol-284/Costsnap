import React, { useState } from 'react';

const Signup = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const SERVER_URL =  process.env.REACT_APP_SERVER_URL;

  const handleSignup = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/usersignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Signup successful:', data);
    } catch (err) {
      console.error('Signup failed:', err.message);
      setError('Signup failed');
    }
  };

  return (
    <div>
      <div className="p-10 bg-white shadow-md rounded w-[450px] h-[600px] mt-[70px] ml-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">FirstName</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter your firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">LastName</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter your lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2"> UserName</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter your UserName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
