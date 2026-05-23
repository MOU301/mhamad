import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import axiosInstance from '../../API/Api';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddView = () => {
    const {userInfo,sendView,setSendView}=useContext(Context);
    const [viewInfo,setViewInfo]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
    if(!sendView){
     navigate('/courses');
    }

    },[])
    const handlChange=(e)=>{
      setViewInfo(e.target.value);
    }
    const handlView=async(e)=>{
        e.preventDefault();
  
        const data={
          viewInfo
        }
        await axiosInstance.post(`/api/addView`,data)
        .then(res=>{
          if(res.data.message=='success'){
          setSendView(false);
            navigate('/courses')
          }
        })
        .catch(error=>{});
  

        //hier is post to add the view to database 
    }
  return (
    <section className='py-5'>
        <div className='container'>
          <h3 className='text-center text-main'>
            <strong>Meinung hinzufügen</strong>
         </h3>
        <form onSubmit={handlView}>
            <div>
                <textarea className='form-control' rows='10' name="view" id="view" onChange={(e)=>handlChange(e)} value={viewInfo.view}> </textarea>
            </div>
           <div className='py-2'> 
             <button className='btn btn-second'>hinzufügen</button>
            </div>
        </form>
        </div>
    </section>
  )
}

export default AddView
