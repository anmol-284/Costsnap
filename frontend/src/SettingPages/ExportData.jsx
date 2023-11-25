import React from 'react'
import CTAButton from "../components/core/Button"

const ExportData = () => {
  return (
    <div  className='text-white'>
         
         <div className='text-stone-300 w-[100vw]   border-b-[1px] border-b-blue-500 '>
            <h2 className='text-4xl mb-2 mt-10 ml-24 '> Export Data</h2>
          </div>
            
        <div className='flex justify-start m-16 text-3xl'>
            <h2>Download the Data of Expenses in PDF</h2>

        </div>

        <div className='flex flex-row gap-7 mt-8'>
        <CTAButton active={true} linkto={"/Export PDF"}>Export PDF</CTAButton>
    
      </div>


    </div>
  )
}

export default ExportData
