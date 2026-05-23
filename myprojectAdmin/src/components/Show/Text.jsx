import React, { useEffect, useState } from 'react'



const ShowText = ({item}) => {
    const [text,setText]=useState([]);
    useEffect(()=>{
         setText(item.text.split('//'));
    },[])
 
  return (
    <div>
      <h4><strong className='text-danger'>Text </strong></h4>
      <h5>{item.ask}</h5>
    {text.map((item,index)=><p key={index}>{item} .</p>)}
    </div>
  )
}

export default ShowText
