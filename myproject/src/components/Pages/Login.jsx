// import React, { useContext, useEffect, useState } from 'react'
// import { Context } from '../../Context/Context'
// import { NavLink, useNavigate } from 'react-router';
// import Form from '../Elements/Form';

// import axios from 'axios';
// import axiosInstance from '../../API/Api';
// import { jwtDecode } from 'jwt-decode';

// const Login = () => {
//     const {setLogin,setUserInfo,setMessage,Uapi,login}=useContext(Context);
    
//     const navigate=useNavigate();


//     useEffect(()=>{
     
//     setMessage(null)
//     },[])
//     useEffect(()=>{
//       if(login){
//         navigate('/')
//       }
//     },[login])
   
//     const handleGoogleLogin = async (credentialResponse) => {
//   try {
//     const decoded = jwtDecode(credentialResponse.credential);


//     // ✅ الخطوة الأولى: الحصول على Cookie CSRF من Laravel Sanctum
//     await axios.get(`${Uapi}/sanctum/csrf-cookie`, {
//       withCredentials: true,
//     });

//     // ✅ بيانات المستخدم القادم من Google
//     const info = {
//       name: decoded.name,
//       email: decoded.email,
//       google_id: decoded.sub,
//     };
  
  

//     // ✅ إرسال البيانات إلى Laravel
//     const res = await axiosInstance.post(`/api/google-register`, info);



//     // ✅ التحقق من نجاح العملية
//     if (res.data.message === "success") {
//       setLogin(true);
//       setUserInfo(res.data.user);
   
//       navigate("/");
//     } else {
//       setMessage(res.data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     alert(error.response?.data?.message || "Google login failed");
//   }
// };

//   return (

      
//        <Form type='login'  handleGoogleLogin={handleGoogleLogin}>
           
//             <NavLink to='/createAcount' className='block text-center  bg-white  py-1 px-2 cursor-pointer hover:bg-blue-100 text-[var(--main-color)]'  >Konto erstellen</NavLink>
             
//        </Form>

 
//   )
// }

// export default Login
import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'
import { useNavigate } from 'react-router'
import Form from '../Elements/Form'
import axios from 'axios'
import axiosInstance from '../../API/Api'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const { setLogin, setUserInfo, setMessage, Uapi, login } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => { setMessage(null) }, [])
  useEffect(() => { if (login) navigate('/') }, [login])

  const handleGoogleLogin = async credentialResponse => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      await axios.get(`${Uapi}/sanctum/csrf-cookie`, { withCredentials: true })
      const res = await axiosInstance.post('/api/google-register', {
        name: decoded.name,
        email: decoded.email,
        google_id: decoded.sub,
      })
      if (res.data.message === 'success') {
        setLogin(true)
        setUserInfo(res.data.user)
        navigate('/')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Google login failed')
    }
  }

  return <Form type="login" handleGoogleLogin={handleGoogleLogin} />
}

export default Login
