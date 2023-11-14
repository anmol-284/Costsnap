import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({children,linkto}) => {
    // children:- refers to the line written into the button Tag,
    // active :- refers to the type OR color of button we want to make(yellow OR BLACK)
    //  and linkto :- refers to the link/page to which after clicking the button it is open
  return (
    <Link to={linkto}>
    <div className={`text-center text-[20px] bg-yellow-400 w-56 h-56 m-5 ml-12 p-6 rounded-md font-bold   hover:scale-95 transition-all duration-200`}>
        {children}
    </div>
    </Link>
  )
}

export default Button
