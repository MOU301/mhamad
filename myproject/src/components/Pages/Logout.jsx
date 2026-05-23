import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import { useNavigate } from 'react-router';
import axios from 'axios';
import axiosInstance from '../../API/Api';

const Logout = () => {
    const {setLogin,setMyCoursesData,Uapi,setUserInfo}=useContext(Context);
    const navigate=useNavigate() 
    const logout=async()=>{
      try{

        const response= await axiosInstance.post(`/api/logout`);
 
        if(response.data.message=='success'){
            setLogin(false);
            setMyCoursesData([]);
            setUserInfo(null);
        
            navigate('/')
          }}catch{
            console.error('the error is :'+error);
          }
    }
  useEffect(()=>{
       logout()
  },[])

}
export default Logout
