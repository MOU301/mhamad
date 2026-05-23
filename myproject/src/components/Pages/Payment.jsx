import React, { useContext, useState,useEffect } from 'react'
import { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Context } from '../../Context/Context';
import axios from 'axios';
import axiosInstance from '../../API/Api';
const Payment = () => {
    const {userInfo,Uapi}=useContext(Context);
    const [pay,setPay]=useState({'name':'','number':'','date':'','cvv':''});
    const [message,setMessage]=useState('');
    const {id}=useParams()
    const navigate=useNavigate();
    useEffect(()=>{
     if(userInfo==null){
        navigate('/login');
     }
    },[])
    const handlPay=async(e)=>{
        e.preventDefault();
        const check=Object.values(pay).every(value=>value!='')
        if(!check){
           setMessage('fill the field please ');
        }else{
//hier kann man send the pay info to the payment gateway and get response
    //if the payment is successfull do this 
        const data={
            user_id:userInfo.id,
            course_id:id,
            payData:pay
        }
    
     const res= await axiosInstance.post(`/api/buyCourse`,data)
              if(res.data.message=='success' || res.data.message=='old'){
               navigate(`/course/${id}`)
              }
        //send request to pay if ok add the user_id and coures_id to course_user table
    }
}
    const handlInput=(e)=>{
      let {name,value}=e.target;
        setPay({...pay,[name]:value});
    }
  return (
 
    <div className='container '>
        <div className='payment'>
            <div className="payment-container">
            <h2>Payment Details</h2>
            {message!='' ? <p className='text-white border-5 bg-second'>{message}</p> : ''}
            <form onSubmit={handlPay}>
                <div className="input-group">
                    <label htmlFor="name">Cardholder Name</label>
                    <input type="text" onChange={(e)=>handlInput(e)} name='name' id="name" placeholder="Momo"/>
                </div>

                <div className="input-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input type="text" onChange={(e)=>handlInput(e)} name='number' id="card-number" placeholder="1234 5678 9012 3456" maxLength="19"/>
                </div>

                <div className="input-flex">
                    <div className="input-group">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input type="text" onChange={(e)=>handlInput(e)} name='date' id="expiry" placeholder="MM/YY" maxLength="5"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="cvv">CVV</label>
                        <input type="password" onChange={(e)=>handlInput(e)} name='cvv' id="cvv" placeholder="123" maxLength="3"/>
                    </div>
                </div>

                <button type='submit' className="pay-btn btn btn-main" >Pay Now</button>
             </form>
            <div className="card-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa"/>
            </div>
        </div>
        </div>
    </div>

  )
}

export default Payment;
