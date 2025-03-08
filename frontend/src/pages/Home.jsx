import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../components/utils';
import Dashboard from './Dashboard/Dashboard';

const HomePage = () => {
  const token = getCookie('token');

  console.log(token);
  
  if (token) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="text-lg font-semibold">CostSnap</div>
        </div>
        <div className="flex items-center space-x-2">
          <a href="/login" className="text-cyan-500 hover:text-cyan-400">Log In</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Manage Your Expenses Easily With <span className="text-pink-500">CostSnap</span>
          </h1>
          <p className="text-lg mb-8">
            We are providing the easiest way to manage expenses. Get a full view so you know where to save. Track spending and Split bills.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-black py-2 px-6 rounded-full">
            <a href="/signup">Get Started</a>
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
