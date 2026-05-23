import React, { useCallback, useContext, useEffect, useState, useTransition} from 'react';
import Test1 from './Test1'
import Test2 from './Test2'
import Test3 from './Test3'
import Test4 from './Test4'
import Test5 from './Test5'
import Test6 from './Test6'
import TestAudio from './TestAudio'
import TestDialog from './TestDialog'
import Timer from './Timer';


// import Next from '../Elements/Next'; 

import { Context } from '../../Context/Context';  

import {  useNavigate, useParams } from 'react-router';
import axiosInstance from '../../API/Api';

// import { ImOffice } from 'react-icons/im';
const components={
  Dialog:TestDialog,
  FillText:Test1,
  TrueAndFalse:Test2,
  QuestionAndAnsur:Test3,
  FillWithImage:Test4,
  Audio:TestAudio,
  WriteSentence:Test5,
  Choice:Test6,
}

const RenderComponent=(item,id)=>{
  const stringComponent = item;
  const componentName = stringComponent.match(/<(\w+)/)[1];
  const Component = components[componentName];
  return Component ? React.createElement(Component, { id }) : <p>Component not found</p>;
 }
const Lesson = () => {
  const {setTest_id,unterricht,ids,dataTest,point,setClick,setPoint,setResultTest,timerState,setWieder,setTimerState,
    resultTest,meakUnterrichtArr,setFertig,fertig,courseId,userInfo,refreshCourse,setUpdate}=useContext(Context);

  const navigate=useNavigate()
  const {id}=useParams();
 const [meak,setMeak]=useState(false)
 const [totalInput,setTotalInput]=useState(null)
 const [totalExam,setTotalExam]=useState([]) ;
const [nava,setNava]=useState(null);
const [retry,setRetry]=useState(false);
const [restart,setRestart]=useState(false);
 
 useEffect(()=>{
  setTotalInput(0);
   const mytest=dataTest.filter((item)=>item.id==id);
  if(mytest.length>0){
    setTotalInput(dataTest.filter(item=>item.id==id)[0].lesson_data.map(ele=>ele.ansur!=null ? ele.ansur.length:0).reduce((a,b)=>a+b,0));
    setTest_id(id);
    meakUnterrichtArr(mytest[0].lesson_data,'test')
      setMeak(true)
          mytest[0].lesson_data.map(ele=>{
        setTotalExam(pre=>pre.includes(ele.id)?pre:([...pre,ele.id]))
      })
  
  }else{
   navigate('/courses')
  }
 },[restart]);

 const updateInfoTest=async (uid,cid)=>{
  return await axiosInstance.patch(`/api/updateTest/${uid}/${cid}`)

 }
useEffect(()=>{
   if(!timerState){
 
      const repate=confirm('the timer is finish repate the test or not?');
    
      if(repate){
        setWieder(e=>!e)
       setRetry(true);
      }else{
        setWieder(e=>!e)
        navigate(`/course/${courseId}`)
      }
    }
  if(resultTest.length>0 && totalExam.length==resultTest.length){
    setFertig(true);
   
    if(point>=totalInput*2/3){
     const userId=userInfo.id;
        //send request to updatetest 
        updateInfoTest(userId,courseId).then(res=>{
          if(res.data.message=='success' ){
           setUpdate(true)
             refreshCourse();
            setUpdate(false)
            setFertig(false)         
           setPoint(0);
           setResultTest([])
            setNava("nava");
          }else if(res.data.message=='finished'){
            setUpdate(true)
            setFertig(false)
           setPoint(0);
           setResultTest([])
            navigate('/finish')
          }
        })
    
    }
    else{
      setRetry(true);
    }
  }
},[resultTest,totalExam,timerState])

useEffect(()=>{
  if(nava!=null){
    navigate(`/course/${courseId}`)
  }
  
},[nava])

 const meakTest=useCallback(()=>{

   if(meak){
    return <>{unterricht.map((item,index)=><div key={index} className={`style${(index+1)%5} style`}>{RenderComponent(item,ids[index])}</div>)}</>
   }
 },[meak])
const handlClick=()=>{
  setClick(e=>!e); 
}
const handRetry=()=>{

  setMeak(false);
  setTotalExam([])
  setResultTest([])
  setFertig(false)
  setPoint(0);
  setRetry(false)
  setRestart(e=>!e);

}
const hanldPoint=useCallback(()=>{
  return point;
},[point,fertig])
  return meak ? (
    
  <>
 
  <div className='my-5'>
     <div className='flex justify-between items-center content-center'> <Timer total='150'/><div> point : <span>{hanldPoint()}</span></div></div>
   <section className='lesson'>
   
   <div className='container'>
      {meakTest()}
      
    </div>
 
   </section>
    <div className='my-3'> 
    {!retry ? <button className='bg-[var(--main-color)] text-white py-2 px-4 rounded-md' onClick={()=>{handlClick()}}>fertig</button>:
              <button className='bg-[var(--main-color)] text-white  py-2 px-4 rounded-md' onClick={()=>{handRetry()}}>wiederholen</button>}  


      </div>
   
   </div>
   </>
        
  ):''
}

export default Lesson
