import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiGroupLine } from 'react-icons/ri';
import { MdOutlineSettings } from 'react-icons/md';
import { TbLogout, TbChartCandle } from 'react-icons/tb';
import { CgArrowsExchange } from "react-icons/cg";

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
    }, 1000);
  };

  return (
    <div className='fixed left-0 top-0 h-full flex flex-col justify-between bg-gray-950 border-r border-gray-800'>
      
      <div>
        <div className='text-white w-60 h-20 flex items-center px-6'>
          <p className='text-xl'>Costsnap</p>
        </div>

        <nav className='w-60'>
          <ul className='px-4 text-gray-100'>
            <li className='p-2 hover:bg-gray-900 rounded-md'>
              <Link to="/dashboard" className="">
                <div className='flex items-center gap-3 transition-all duration-200 w-fit'>
                  <LuLayoutDashboard />
                  <p className="text-sm">Dashboard</p>
                </div>
              </Link>
            </li>

            <li className='p-2 hover:bg-gray-900 rounded-md'>
              <Link to="/transactions" className="">
                <div className='flex items-center gap-3 transition-all duration-200 w-fit'>
                  <CgArrowsExchange />
                  <p className="text-sm">Transactions</p>
                </div>
              </Link>
            </li>

            <li className='p-2 hover:bg-gray-900 rounded-md'>
              <Link to="/groups" className="">
                <div className='flex items-center gap-3 transition-all duration-200 w-fit'>
                  <RiGroupLine />
                  <p className="text-sm">Groups</p>
                </div>
              </Link>
            </li>

            <li className='p-2 hover:bg-gray-900 rounded-md'>
              <Link to={"/investments"} className="">
                <div className='flex items-center gap-3 transition-all duration-200 w-fit '>
                  <TbChartCandle />
                  <p className="text-sm">Investments</p>
                </div>
              </Link>
            </li>

            <li className='p-2 hover:bg-gray-900 rounded-md'>
              <Link to={"/chart"} className=" ">
                <div className='flex items-center gap-3 transition-all duration-200 w-fit '>
                  <BiBarChartAlt2 />
                  <p className="text-sm">Charts</p>
                </div>
              </Link>
            </li>

            <li className='p-2 hover:bg-gray-900 rounded-md'>
              <Link to="/settings" className="">
                <div className='flex items-center gap-3 transition-all duration-200 w-fit'>
                  <MdOutlineSettings />
                  <p className="text-sm">Settings</p>
                </div>
              </Link>
            </li>


          </ul>
          
        </nav>
      </div>
      <div className='px-6 py-4'>
            <Link className="text-red-700 hover:text-blue-700">
              <div className='flex items-center gap-3 transition-all duration-200 hover:scale-95 w-fit'>
                <TbLogout />
                <button onClick={logout}><p className="text-md">Logout</p></button>
              </div>
            </Link>
          </div>
    </div>
  );
};

export default withAuth(Navbar);
