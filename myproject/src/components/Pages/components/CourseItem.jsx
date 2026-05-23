import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { Context } from '../../../Context/Context';
import axiosInstance from '../../../API/Api';
// import image from '../../../assets/A1.png'

const CourseItem = ({data,type}) => {
  const [more,setMore]=useState(false);
  const [text,setText]=useState('');
  const {myCourses,userInfo}=useContext(Context);


  return (
    <div className='p-2 bg-white rounded-2xl space-y-5 font-serif' >
        {/* <img src={data.bostter}/> */}
        <img className='rounded-2xl ' src={data.bostter} alt='Course A1 '/>
        <div  >
            <div className='text-[var(--second-background)] ml-5'>
                <strong className='text-[var(--main-color)]' >title :</strong> <span >{data.title}</span><br/>
                <strong className='text-[var(--main-color)]'> price :</strong> <span >{data.price==0?'free':data.price}</span><br/>
                <strong className='text-[var(--main-color)]'>author : </strong><span >{data.author}</span> <br/>
                {/* <strong className='text-red'>the description of author : </strong><br/> */}
                {/* <p className='text-dark'>{text} <span className='text-primary' onClick={()=>setMore(e=>!e)}>{more ? 'lass':'more'}</span></p> */}
                <div className='my-5 ' >
                  <NavLink to={`/course/${data.id}`} className=' bg-[var(--main-color)] px-3 py-1 rounded-2xl text-[var(--main-background)] hover:text-[var(--main-color)] hover:bg-[var(--main-background)] transition-all transition-normal'>
                     show
                  </NavLink>
                  {type==null && data.price>0 ? <NavLink className='bg-[var(--main-background)] px-3 py-1 rounded-2xl text-[var(--main-color)] hover:text-[var(--main-background)] hover:bg-[var(--main-color)] transition-all transition-normal' to={`/payment/${data.id}`}>Pay</NavLink>:''}
                  {/* {type==null ? <>{ data.price=='0' ? 
                  <button className='btn btn-second' onClick={()=>handlAdd(data.id)}>add</button> :
                   <NavLink className=' btn btn-second mx-3' to={`/payment/${data.id}`}>Pay</NavLink>}</>:''
                 } */}
                </div>
                
            </div>
        </div> 
    </div>
  )
}

export default CourseItem
