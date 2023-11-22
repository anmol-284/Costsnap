import React from 'react'
import {Line} from "react-chartjs-2";
 const labels = ["2017" , "2018" , "2019" , "2020" ,"2021" , "2022"];

export const data = {
    labels,
   datasets : [
   {
     label : "Income",
     data : [2000,3000,4000,4000,4500,5000],
     backgroundcolor:"#2196F3",
     bordercolor:"#2196F3",
   },
   {
    label : "Expenses",
    data : [700,760,800,850,950,1000],
    backgroundcolor:"#F44236",
    bordercolor:"#F44236",
  },
  {
    label : "Savings",
    data : [2000,3000,4000,4000,4500,5000],
    backgroundcolor:"#FFCA29",
    bordercolor:"#FFCA29",
  },
]
}

const Charts = () => {

  return (
//    <div style={{width:600,height:300}}></div>
//    <Line options={options} data={data} />
<div>
  
</div>
  )
}

export default Charts
