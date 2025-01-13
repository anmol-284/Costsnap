import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaChartPie } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { LuSplit } from 'react-icons/lu';
import { RiStockFill } from 'react-icons/ri';
import { MdOutlineSettings } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';

import withAuth from '../Hoc';  // Ensure correct path to withAuth

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem('token'); // Adjust this based on how you store authentication data

    // Clear the token from cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page or home page
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div style={{ boxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)' }} className='fixed left-0 top-0 w-60'>
      {/* Nav Links */}
      <div
        className='text-white w-60 h-44 flex items-center justify-center'
        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      >
        <p className='text-4xl font-bold'>CostSnap</p>
      </div>

      <nav className='w-60' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <ul className='m-6 px-5 pb-5 text-gray-300'>
          <li className='m-4 p-2'>
            <Link to="/dashboard" className="hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit'>
                <FaHome />
                <p className="text-xl">Home</p>
              </div>
            </Link>
          </li>

          <li className='m-4 p-2'>
            <Link to="/transactions" className="hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit'>
                <BiTransfer />
                <p className="text-xl">Transactions</p>
              </div>
            </Link>
          </li>

          <li className='m-4 p-2'>
            <Link to="/splitbills" className="hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit'>
                <LuSplit />
                <p className="text-xl">SplitBills</p>
              </div>
            </Link>
          </li>

          <li className='m-4 p-2'>
            <Link to={"/investments"} className=" hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit '>
                <RiStockFill />
                <p className="text-xl">Investments</p>
              </div>
            </Link>
          </li>

          <li className='m-4 p-2'>
            <Link to={"/chart"} className=" hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit '>
                <FaChartPie />
                <p className="text-xl">Charts</p>
              </div>
            </Link>
          </li>

          <li className='m-4 p-2'>
            <Link to="/settings" className="hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit'>
                <MdOutlineSettings />
                <p className="text-xl">Settings</p>
              </div>
            </Link>
          </li>

          <li className='m-4 px-2 pt-20'>
            <Link className="text-red-700 hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit'>
                <TbLogout />
                <button onClick={logout}><p className="text-xl">Logout</p></button>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default withAuth(Navbar);
