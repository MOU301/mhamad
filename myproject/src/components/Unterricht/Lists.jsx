import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import Next from '../Elements/Next';
import { NavLink } from 'react-router';
import { Fish } from 'lucide-react';
const Lists = ({id}) => {
    const {next,setNext,lists,setLists,finsh}=useContext(Context);
    const [notActive,setNotActive]=useState([]);
    useEffect(()=>{
          const arr=lists.slice();
          const arr1=notActive.slice();
          if(!arr.includes(next)){
             arr.push(next);
          }
          if(arr1.includes(next)){
            const index=arr1.indexOf(next);
            arr1.splice(index,1);
          }
        setLists(arr);
        setNotActive(arr1);
      
      
     
    },[next]);
    useEffect(()=>{
      if(finsh>0){
        for(let i=2;i<=finsh;i++){
          if(!notActive.includes(i)){
            setNotActive(e=>[...e,i])
          }
       }
      }
    },[finsh])


    const handlNext1=(index)=>{
      setNext(index)
    }
  return (
    <div >
    {next==1 ? 
    <NavLink className='bg-[var(--second-background)] text-[var(--main-background)] 
        px-2 py-1 border-1 border-[var(--main-background)] 
         rounded-xl opacity-85 hover:opacity-100' to={`/course/${id}`}>
       Back
    </NavLink>:''}
        <div className=' flex justify-center items-cente content-center mt-5 mb-5'>
          {lists.map((item,index)=><span key={index} className='flex space-x-1'>
                 <button className={`bg-[var(--second-background)]/85 px-2 py-0.5 rounded-2xl text-[var(--main-background)]   ${item==next ? `opacity-100 `:`opacity-60`}`} onClick={()=>handlNext1(item)}>{item}</button>
          </span>)}
          <Next />
            {notActive.map((item,index)=><span key={index} className=''>
                 <button disabled key={index} className='bg-[var(--second-background)]/10 mx-1 px-2 py-0.5 rounded-2xl text-white'>{item}</button>
          </span>)}
        </div>
        
    </div>
  )
}

export default Lists
