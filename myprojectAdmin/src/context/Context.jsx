import {  createContext, useEffect, useState } from "react";
import axiosInstance from "../Api/api";

export const Context=createContext(null);

const ContextProvider=({children})=>{
    const [lessonData,setLessonData]=useState([])
    const [lesson,setLesson]=useState([]);
    const [lessons,setLessons]=useState([]);
    const [login,setLogin]=useState(false);
    const [back,setBack]=useState('');
    const [goBack,setGoBack]=useState('');
    const [courseInfo,setCourseInfo]=useState([]);
    const [author,setAuthor]=useState(null)
    const [adminInfo,setAdminInfo]=useState(null);
    const [mycourses,setMycourses]=useState([]);
    // const Uapi='https://api.foryoulearn.com';
    // const Ulogin='https://foryoulearn.com/login';
    // const Uuser='https://foryoulearn.com';
        const Uapi='http://api.foryou.local';
    const Ulogin='http://foryou.local/login';
    const Uuser='http://foryou.local';



const checkLogin = async () => {
 return await axiosInstance.get(`/api/user`)
  
}
  useEffect(()=>{
checkLogin().then(res => {
    if(res.data.role!='admin'){
      setAdminInfo(null);
      setLogin(false);
      window.location.href=Ulogin
      return;
    }
    setAdminInfo(res.data);
    setLogin(true)
  })
  .catch((error) => {

    setAdminInfo(null);
    setLogin(false);
    window.location.href=Ulogin
  });
    
  },[]);

  const getData=async ()=>{
  return await axiosInstance.get(`/api/allCourses`)
  }

    useEffect(()=>{
   
   if(adminInfo!=null){
     
        getData().then(res=>{
         console.log(res.data.data);
          setMycourses(res.data.data)
        })
        .catch(error=>console.log(error));
   }
   },[adminInfo])
    const value={
    lessons,setLessons,lesson,setLesson,mycourses
    ,author,setAuthor,setLogin,login,back,setBack
    ,courseInfo,setCourseInfo,lessonData,setLessonData,
    goBack,setGoBack,adminInfo,setAdminInfo,setMycourses,
    Uuser
    }
    return <Context.Provider value={value}>
             {children}
           </Context.Provider>
}
export default ContextProvider;

