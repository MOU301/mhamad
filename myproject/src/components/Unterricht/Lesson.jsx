import React, { useCallback, useContext, useEffect, useState, useTransition} from 'react';
import Video from './Video';

import Ubung1 from './Ubung1';
import Ubung2 from './Ubung2';
import Ubung3 from './Ubung3';
import Lists from './Lists';

import Audio from './Audio';
// import Next from '../Elements/Next'; 
import Fassung from './Fassung';
import BotTest from './BotTest';
import Ubung4 from './Ubung4';
import Dialog from './Dialog';
import Choice from './Choice';
import LessonText from './Text';
import Grammatik from './Grammatik';
import { Context } from '../../Context/Context';
import TranslateCoponent from '../Pages/components/TranslateCoponent';
import { data, useNavigate, useParams } from 'react-router';

import axios from 'axios';
import WriteSentence from './WriteSentence';
import Images from './Images';
import axiosInstance from '../../API/Api';
import Ubung1Click from './Ubung1Click';
import Ubung3Click from './Ubung3click';
import Ubung4Click from './Ubung4Click';
import WriteSentenceClick from './WriteSentenceClick';

// import { ImOffice } from 'react-icons/im';
const components={
  Grammatik:Grammatik,
  Video:Video,
  Dialog:Dialog,
  Bot:BotTest,
  FillText:Ubung1,
  FillTextClick:Ubung1Click,
  TrueAndFalse:Ubung2,
  QuestionAndAnsur:Ubung3,
  QuestionAndAnsurClick:Ubung3Click,
  FillWithImage:Ubung4,
  FillWithImageClick:Ubung4Click,
  Audio:Audio,
  Summary:Fassung,
  WriteSentence:WriteSentence,
  WriteSentenceClick:WriteSentenceClick,
  Image:Images,
  Choice:Choice,
  LessonText:LessonText
}
const RenderComponent=(item,id)=>{
  const stringComponent = item;
  const componentName = stringComponent.match(/<(\w+)/)[1];
  const Component = components[componentName];
  return Component ? React.createElement(Component, { id }) : <p>Component not found</p>;
 }
const Lesson = () => {
  const {setOld,myCoursesData,show,setShow,mach,setUpdate,setMach,setNext,setLists,login,unterricht,ids,setPathName,next,finsh,lessons,lessonData,setLessonData,word,setWord,refreshCourse}=useContext(Context);
const [course_id1,setCourse_id1]=useState(null);
  const navigate=useNavigate()
  const {id}=useParams();
 const [lessonNumber,setLessonNumber]=useState(null);
 const [nav,setNav]=useState(null);
  //translate component
      
  //translate component
//    
  useEffect(()=>{

setMach(false);  
  let url = new URL(window.location.href);
  if(!login){
    navigate('/login');
  }else{

    setPathName(url.pathname)
    const lesson=lessons.filter(item=>item.id==id);

     setLessonData(lesson[0].lesson_data);
     console.log(lesson[0].lesson_data);
     setLessonNumber(lesson[0].number);
     if(lessons.length>lesson[0].number){
      setOld(true);
     }

       setNext(1);
      setLists([1])
     setCourse_id1(window.location.pathname.split('/')[2]);
  }
  },[]);
useEffect(()=>{
console.log('how is ', show )
if(show){
  setTimeout(() => {
    setShow(false)
  }, (3000));
}
},[show])
  const updateLesson=async(data)=>{
   return await axiosInstance.post(`/api/nextlesson`,data)
  }
    useEffect(()=>{ 
    
      if(next==finsh && next>0 && mach==true){
      
      const page=window.location.pathname.split('/');
      const lesson_id=page[4]
 
       const lesson_number=lessons.filter(item=>item.id==lesson_id)[0].number;
       const next_lesson=lessons.filter(item=>item.number==(lesson_number+1));
       if(next_lesson.length>0){
        //no request to database
        //add button to lesson list go 
    
       }else{
        const data={
          course_id:course_id1,
          lesson_number:lessonNumber
         }
 
         updateLesson(data)
             .then(res=>{
         
    
              if(res.data.message=='success' || res.data.message=='added' || res.data.message=='no_update'){
              setUpdate(true);
              refreshCourse();
             setUpdate(false);   
              setNav('next');
             }else if(res.data.message=='buy'){
              setNav(`pay`);
            }else if(res.data.message=='finish'){
              setNav('finish');
             
             }else{
              setNav('Nlesson');
             }
            })
             .catch(error=>{})
        
       }
          }
   
   },[next,mach])
  
   const handlNav=()=>{
    setNext(null);
    if(nav=='next'){
      navigate(`/course/${course_id1}`);
    }
    else if(nav=='pay'){
      navigate(`/payment/${course_id1}`);
    }
    else if(nav=='finish'){
      navigate('/finish');
    }else{
      navigate(`/course/${course_id1}`);
    }
   }
   const rrr=useCallback(()=>{

     return unterricht.map((item,index)=><div key={index} className="bg-[var(--main-color)]/30 rounded-2xl">{RenderComponent(item,ids[index])}</div>)
   },[unterricht])
   
  return login ? (
    lessonData.length>0 ? (
  <>
  <div className='container mx-auto px-4 my-20'>
    
   <Lists id={course_id1}/>
 

      {rrr()}
     <TranslateCoponent word={word} setWord={setWord} />
    
   {nav!=null ? 
    <div  className='my-7 '>
      <button className='bg-[var(--second-background)] text-[var(--main-background)] px-2 py-1 border-1 border-[var(--main-background)] rounded-xl opacity-85 hover:opacity-100' onClick={()=>{handlNav()}}>{nav=='finish' ? 'Finish':nav=='next'?"Next Lesson":nav=='pay'?'pay':"next lesson"}</button>
    </div>:""}
   </div>
   </>
    ):''
  ):''
}

export default Lesson
