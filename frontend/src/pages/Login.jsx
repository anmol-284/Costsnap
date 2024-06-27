import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log(SERVER_URL);
      const response = await fetch(`${SERVER_URL}/userlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Set the token in a cookie
      document.cookie = `token=${data.token}`;

      // Redirect to the transactions page
      window.location.href = 'transactions';
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid credentials');
      
    }
  };

  return (
    <div>
      <div className="mt-[170px] ml-[400px] p-10 bg-white shadow-md rounded w-[450px] h-[360px] m-[100px]">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="text"
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
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to="/forgetpassword">
          <p className='text-center mt-3 text-zinc-600'>Forget Password?</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
