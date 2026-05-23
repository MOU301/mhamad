import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/api';

const Login = () => {
      const {login,setLogin,setSuperInfo,Ulogin,Uapi}=useContext(Context);
    const [user,setUser]=useState({'email':'','password':''});  

    const navigate=useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
    
    if (!token || role !== "super_admin") {
        window.location.href = Ulogin; // Back to login
      }else{
        navigate('/courses')
      }
    }, []);
    const Submit=async(e)=>{
        e.preventDefault();
        if(user.email!='' && user.password!=''){
          await axiosInstance.post('/login',{...user},{
          withCredentials:true
          }).then((res)=>{
            if(res.data.message=='success'){
                setSuperInfo(res.data.data);
                navigate('/user');
            }
          }).catch(error=>console.log(error));
    
        }
        
 
    }

    const handlInput=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
    }
  
  return (
    <section className='my-5 login'>
      <div className='container'>
        <div className="h-80 d-flex justify-content-center align-items-center align-content-center">
           <form onSubmit={Submit} className='border p-2'>
            <h4 className='text-center text-danger'><strong>login</strong></h4>
            
            <div className='my-2'>
              <label className='my-2' htmlFor="email"><strong>Email :</strong> </label>
              <input type="email" className='form-control' onChange={(e)=>handlInput(e)} value={user.email} name='email' placeholder='Enter Email' required/>
            </div>
            
            <div className='my-2'>
              <label className='my-2' htmlFor="email"><strong>Password :</strong> </label>
              <input type="password" className='form-control' onChange={(e)=>handlInput(e)} value={user.password} name='password' placeholder='******' required/>
            </div>
            
            <button className='btn btn-success' type='submit'>login</button>
           </form>
        </div>
       </div>
    </section>
  )
}

export default Login
