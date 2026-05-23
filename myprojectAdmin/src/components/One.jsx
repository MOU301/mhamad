import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Context } from '../context/Context';

const One = () => {
  const {Ulogin}=useContext(Context)
    const navigate=useNavigate();
   useEffect(() => {

    navigate('/home');
 
   }, []);
  return (
    <div>
      
    </div>
  )
}

export default One
