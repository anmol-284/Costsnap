import React from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Settings = () => {

 

return (
<div className='text-white'>
    
<div className='text-stone-300 w-[100vw]   border-b-[1px] border-b-blue-500 '>
            <h2 className='text-4xl mb-2 mt-10 ml-24 '>Settings</h2>
          </div>


      <div className='text-2xl flex flex-col justify-center ml-56 '>
        {/* Theme Section */}
      <div className='flex flex-row items-center  p-12 m-2 bg-slate-900 w-[1000px] h-24 border-[1px] border-solid rounded-lg '>
        <h2>Theme </h2>
        <Link to={"/theme"} className=" hover:text-blue-700 ml-[760px]">
          < FaGreaterThan />  </Link>

      </div>


      {/* Notification Section */}
      <div className='flex flex-row items-center  p-12 m-2 bg-slate-900 w-[1000px] h-24 border-[1px] border-solid rounded-lg '>
        <h2>Notifications </h2>
        <Link to={"/notifications"} className=" hover:text-blue-700 ml-[700px]">< FaGreaterThan /></Link>
      </div>

      {/* Export Data Section */}
      <div className='flex flex-row items-center  p-12 m-2 bg-slate-900 w-[1000px] h-24 border-[1px] border-solid rounded-lg '>
        <h2>Export Data</h2>
        <Link to={"/exportdata"} className=" hover:text-blue-700 ml-[710px]">< FaGreaterThan /></Link>
      </div>

     {/* About Section */}
     <div className='flex flex-row items-center  p-12 m-2 bg-slate-900 w-[1000px] h-24 border-[1px] border-solid rounded-lg '>
        <h2>About </h2>
        <Link to={"/about"} className=" hover:text-blue-700 ml-[775px]"> < FaGreaterThan /></Link>
            </div>

     {/* Help Section */}
     <div className='flex flex-row items-center  p-12 m-2 bg-slate-900 w-[1000px] h-24 border-[1px] border-solid rounded-lg '>
        <h2>Help</h2>
        <Link to={"/help"} className=" hover:text-blue-700 ml-[785px]"> < FaGreaterThan /></Link>
      </div>
      </div>


    </div>
  )
}

export default Settings
