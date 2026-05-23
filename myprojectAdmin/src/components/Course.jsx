import React, { useCallback, useContext, useEffect, useState} from 'react'

import { NavLink, useParams } from 'react-router'
import { Context } from '../context/Context'
import axiosInstance from '../Api/api'



const Course = () => {
    const {lessons,setLesson,setLessons,mycourses,login,setBack,setGoBack}=useContext(Context);

    const {id}=useParams();

    const [onlyLessons,setOnlyLessons]=useState([]);  
    const [onlyTests,setOnlyTests]=useState([]);
    const [sortBy,setSortBy]=useState(false);
    const [ended,setEnded]=useState(null);
    const getlessons=()=>{
         
        const url=window.location.pathname;
        setBack(url);
        setGoBack('');
          const course=mycourses.filter(item=>item.id==id)[0];
          setEnded(course.ended);
        const items=course.lessons ?? [];
        
        const onlyLessons=items.filter(item=>item.type=='lesson');
        const onlyTests=items.filter(item=>item.type=='test');
        console.log(onlyTests)
        setOnlyLessons(onlyLessons);
        setOnlyTests(onlyTests); 
    }
    useEffect(()=>{
      setLesson([])
    },[]);
 useEffect(()=>{
  if(mycourses.length>0){
     getlessons();
  }
 },[mycourses]);

useEffect(()=>{
let sortedLessons=[];
let testNumber=0;
  if(onlyLessons.length>0){
    for(let i=0;i<onlyLessons.length; i++){
      if(onlyLessons[i].test && onlyTests.length>testNumber){
        sortedLessons.push(onlyTests[testNumber])
        testNumber+=1;
      }
      sortedLessons.push(onlyLessons[i]);
    }
    if(testNumber<onlyTests.length){
      for(let i=testNumber ; i<onlyTests.length; i++){
        sortedLessons.push(onlyTests[i]);
      }
    }
  }
  
  setLessons(sortedLessons)
},[onlyLessons,onlyTests,sortBy]);
const removeLesson=async (name,lesson_id,index)=>{
  let sure=false;
    sure=confirm(`are you sure ?? remove the lesson now ${name}`);
  
if (sure) {


  const res=await axiosInstance.delete(`/api/course/${id}/lesson/${lesson_id}`);

  
    if (res.data.message === 'success') {
      const newLessons = lessons.filter((_, i) => index !== i);
      setLessons(newLessons);
    } 
  
}
}
const handlSorted=async (id,type)=>{
  if(type=='add'){
    const countTestBefor=lessons.filter(pre=>pre.type=='lesson' && pre.test==true).length;
    const countTest=onlyTests.length;

     
    //request to add the test  befor the index(/addTestBefor/index)
    if(countTest>countTestBefor){
      const res=await axiosInstance.post(`/api/addTestBefore/${id}`,{} );
       if(res.data.message=='success'){
        setOnlyLessons(prev=>prev.map(item=>item.id==id ? {...item,test:true}:item));
       }
    }
   
  }else{
    //request to remove the test befor the index (/removeTestBefor/index);
   const res= await axiosInstance.post(`/api/removeTestBefore/${id}`,{});
      if(res.data.message=='success'){
        setOnlyLessons(prev=>prev.map(item=>item.id==id ? {...item,test:false}:item));
      }
  }
}

const rrr=useCallback(()=>{

return  lessons.length>0 ? lessons.map((item,index)=><div className='d-flex justify-content-between' key={index}>
             <NavLink  to={`${item.type}/${item.id}`} className={`btn  my-1 ${item.type=="test" ? 'btn-danger':'btn-dark'}` }>{`${item.type} ${item.number} (${item.title})`}</NavLink>
             <div>
              {item.type=='lesson'? <button className='btn btn-success mx-2' onClick={()=>handlSorted(item.id,item.test?'remove':'add')}>{item.test==false ? "add":"remove"} test</button>:'' }
              <button onClick={()=>removeLesson(item.title,item.id,index)} className='btn btn-danger my-1'>delete</button>
             </div>
             </div>):<h3 className='text-danger text-center py-2'>there is not lesson in this course !!!</h3>
},[lessons])
const handlEndCourse=async()=>{
 
   const response= await axiosInstance.post(`/api/endedCourse/${id}`,{});
   if(response.data.message=='success'){
    setEnded(response.data.ended);
   }
}
const end=useCallback(()=>{
  return <div> <button className={`btn ${ended ? "btn-danger":" btn-success"}`} onClick={()=>handlEndCourse()} >the course is {ended ? "":"Not"} finshed</button></div>
},[ended])
  return login ? (
   <section className='container'>
      <div className='my-4'>
        
       <div className='addLesson'> 
         <NavLink to='lesson' className='btn btn-success '> add lesson</NavLink>
         <NavLink to='test' className='btn btn-success mx-2'>add test</NavLink>
         <NavLink to='/home' className='btn btn-success mx-2'> home</NavLink>
       </div>
       <div className='lessons'>
          {rrr()}
        </div>
      </div>
      {end()}
   </section>
  ):''
}

export default Course
