import React from 'react'

const HighlightText = ({text}) => {
  return (
   <span className='font-bold text-sky-500' >
    {/* for giving space between the words */}
    {" "}  
     {text}
   </span>
  )
}

export default HighlightText
