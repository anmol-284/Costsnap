import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from "../components/core/Homepage/Button";


const Home = () => {
  return (
    <div className='ml-60'>
      Section1
      <div className='  relative mx-auto flex flex-col w-11/12  max-w-maxContent items-center text-white justify-between'>
        <Link to={"/signup"} className="t ">

      <div className='group mt-16 p-3 mx-auto rounded-full bg-neutral-900 font-bold text-neutral-500 transition-all duration-200 hover:scale-95 w-fit' >
         
         <div className='flex flex-row items-center gap-3 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-zinc-950  hover:text-green-700'>
          
            <p className="text-xl  ">Track your Expenses</p>
            <FaArrowRight />
            </div>
     
      </div>
      </Link>

      <div className='text-center text-2xl font-semibold mt-6'>
        Empower Your Future with 
        <HighlightText text={"Money Savings , Expenses & Investments"}/>
      </div>

      <div className=' mt-4  w-[90%] text-center text-lg font-bold text-slate-300 '>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus accusantium ratione nostrum eius deleniti suscipit, ex nihil velit quam? Quod atque repudiandae et provident labore, ad illum minima consectetur exercitationem?
      </div>

      <div className='text-center text-2xl font-semibold mt-6'>
        Empower Your Future with 
        <HighlightText text={"Money Savings , Expenses & Investments"}/>
      </div>

      <div className=' mt-4  w-[90%] text-center text-lg font-bold text-slate-300 '>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus accusantium ratione nostrum eius deleniti suscipit, ex nihil velit quam? Quod atque repudiandae et provident labore, ad illum minima consectetur exercitationem?
      </div>

      <div className='text-center text-2xl font-semibold mt-6'>
        Empower Your Future with 
        <HighlightText text={"Money Savings , Expenses & Investments"}/>
      </div>

      <div className=' mt-4  w-[90%] text-center text-lg font-bold text-slate-300 '>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus accusantium ratione nostrum eius deleniti suscipit, ex nihil velit quam? Quod atque repudiandae et provident labore, ad illum minima consectetur exercitationem?
      </div>

      <div className='flex flex-row gap-7 mt-8'>
        <CTAButton active={true} linkto={"/signup"}>Know More</CTAButton>

        <CTAButton active={false} linkto={"/login"}>Login</CTAButton>

        <CTAButton active={false} linkto={"/dashboard"}>Dashboard</CTAButton>
     
      </div>

      </div>
  
    </div>
  );
};

export default Home;

