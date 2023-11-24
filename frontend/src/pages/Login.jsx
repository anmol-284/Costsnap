import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      axios.post('http://localhost:8000/api/v1/userlogin', {
        email, password
      })
        .then(response => {
          
          const data = response.data;
          console.log('Login successful:', data);

          // Set the token in a cookie
          document.cookie = `token=${data.token}`;

          // Redirect to the transactions page
          window.location.href = 'transactions';
        })
        .catch(error => {
          console.error('Login failed:', error.message);
        });
    } catch (err) {
      setError('Invalid credentials'); // Handle error
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto p-10 bg-white shadow-md rounded">
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

        {/* "Forgot Password" Link/Button */}
        <Link to="/forgot" className="block text-center text-blue-500 mt-2">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
