import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Context } from '../context/Context';
import axiosInstance from '../Api/api';
import axios from 'axios';
const AddCourse = () => {
    const {setBack ,adminInfo,setMycourses,Ulogin,Uapi}=useContext(Context);
    
    const [image,setImage]=useState(false);
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const [description,setDescription]=useState('');
    const navigate=useNavigate();
 

const send = async (e) => {
  e.preventDefault();

  if (
    title.length === 0 ||
    price.length === 0 ||
    description.length === 0 ||
    !image
  ) {
    return;
  }

  try {
   
    const formData = new FormData();
    formData.append("bostter", image);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("price", price);

    const response = await axiosInstance.post(`/api/course`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
 
    if (response.data.message == "success") {
   
      const rrr=await axiosInstance.get(`/api/allCourses`);
        setMycourses(rrr.data.data);
         setBack('/addCourse');
      navigate('/myCourses');
      
     
    } 
  } catch (error) {
    console.error("❌ حدث خطأ أثناء الإرسال:", error);
  }
};
 
  return (
    <section>
        <div className="container">

            <div className='addCourse d-flex justify-content-center align-items-center align-content-center'>
                
                <div className='p-2'>
                  <form onSubmit={send} encType="multipart/form-data">
                    <h4 className='text-center text-danger'><strong> add course</strong></h4>
                    <div className='bostter'>
                        <label htmlFor="bostter">
                            <img  src={!image ? '../../../src/assets/upload1.jpg' : URL.createObjectURL(image)}  />
                        </label>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} name='image' id='bostter' hidden/>
                    </div>
                    <div className='my-3'>
                        <label className='my-2' htmlFor="title"><strong>Title : </strong></label>
                        <input  type="text" className='form-control' onChange={(e)=>setTitle(e.target.value)} value={title} name='title' placeholder='Enter courses name' />
                    </div>

                    <div className='my-3'>
                        <label className='my-2' htmlFor="price"><strong>Price : </strong></label>
                        <input  type="text" onChange={(e)=>setPrice(e.target.value)} value={price} name='price' className='form-control' placeholder='enter price' />
                    </div>
                    <div className='my-3'>
                        <label className='my-2' htmlFor="description"><strong>Description: </strong></label>
                        <textarea className='form-control' onChange={(e)=>setDescription(e.target.value)} value={description} name="description"  id="description" placeholder='description for you' rows='5'></textarea>
                    </div> 
                    
                    <div className='text-center'>
                      <button type='submit'  className='btn btn-success'>Add Course 
                      </button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AddCourse
