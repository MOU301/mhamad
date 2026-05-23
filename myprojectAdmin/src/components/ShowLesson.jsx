import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'

import {Context} from '../context/Context'
import FillText from './Show/FillText'
import FillWithImage from './Show/FillWithImage'
import Video from './Show/Video'
import Audio from './Show/Audio'
import Dialog from './Show/Dialog'
import Bot from './Show/Bot'
import ShowText from './Show/Text'
import QuestionAndAnsur from './Show/QuestionAndAnsur'
import TrueAndFalse from './Show/TrueAndFalse'
import Grammatik from './Show/Grammatik'
import WriteSentence from './Show/WriteSentence'
import Image from './Show/Image'
import Choice from './Show/Choice'
const ShowLesson = ({type}) => {
   
    const navigate=useNavigate();
    const {id}=useParams()
    const {setLessonData,setLesson,mycourses,lesson,lessons,setBack,goBack,login,Ulogin,Uapi}=useContext(Context);
    const [lesson1,setLesson1]=useState([]);
    const [ids,setIds]=useState();
    const [ubungs,setUpungs]=useState([]);
    const [url,setUrl]=useState(null);
    const Pass=(item)=>{
      switch (item.type){
        case 'fillText':
          return <FillText item={item}/>
        case 'fillTextClick':
          return <FillText item={item}/>
        case 'fillWithImage' :
          return <FillWithImage item={item}/>
          case  'fillWithImageClick':
          return <FillWithImage item={item}/>
        case 'questionAndAnsur':
          return <QuestionAndAnsur item={item}/>
        case  'questionAndAnsurClick':
          return <QuestionAndAnsur item={item}/>
        case 'video':
         return <Video item={item}/>
        case 'audio':
          return <Audio item={item} />
        case 'dialog':
          return <Dialog item={item}/>
        case 'bot':
        return <Bot item={item}/>
        case 'trueAndFalse':
        return <TrueAndFalse item={item}/>
        case 'grammatik':
        return <Grammatik item={item}/>
        case 'writeSentence':
         return <WriteSentence item={item}/>
        case  'writeSentenceClick':
         return <WriteSentence item={item}/>
        case 'image':
          return <Image item={item}/>
          case 'choice':
          return <Choice item={item}/>
          case 'lessonText':
          return <ShowText item={item}/>
        default : 
        console.log('there is not component to this item');
        break;
      }
    } 
    useEffect(()=>{ 
      const page=window.location.pathname;
      if(page!='/show'){
        // console.log(page);
        // console.log(page.split('/').slice(0,4).join('/'))
        setUrl(page.split('/').slice(0,4).join('/'));
      }
      if(lessons.length==0){
         navigate('/home')
      }else{
       if(id==undefined){
        setLesson1(lesson)
        setIds(Number(lesson[lesson.length-1].number)+1);
        }else{
          const filterData= lessons.filter(item=>item.id==id);
          setLesson1(filterData[0].lesson_data)
        setIds(filterData[0].number);
        }
        //get the id form useParams and search item from data
      
    }
    
  },[]);

useEffect(()=>{
  let arr=[];
     for(let i=0 ; i<lesson1.length; i++){
      if(arr.length>0){
        let key=null;
        for(let j=0 ; j<arr.length ;j++){
          if(arr[j].id==lesson1[i].id){
            key=j;
          }
        }
        if(key!=null){
         arr[key]=[arr[key],lesson1[i]]
        }else{
         arr.push(lesson1[i]);
        }
       }else{
        arr.push(lesson1[i]);
       }
      }
     console.log(arr) 
 setUpungs(arr);
},[lesson1])
const update=()=>{
  const les=lessons.filter(item=>item.id==id);
  // console.log(les.lesson);
  setLessonData(les)
 if(ubungs.length==0){
  setLesson([]);
 }else{
  setLesson(les[0].lesson_data);

 }

  setBack(window.location.pathname)
  navigate(url)
}
  return login ? (
    <section className='container lesson '>
    <h2 className='text-success my-3'>{`The ${type} ${ids}`}</h2>
      {/* i will use switch loop hier  */}
         {ubungs.map((item,index)=>item.length==undefined 
              ? (<div className='border my-5 p-2' key={index}>{Pass(item)}</div>)
              :(<div className='border my-5 p-2' key={index}>{item.map((e,i )=><div key={i}>{Pass(e)}</div>)}</div>))}
      {id!=undefined ? <NavLink className='btn btn-dark' to='/home'>Home</NavLink>
                     : <NavLink className='btn btn-dark' to={goBack}>Back</NavLink>}
    {url!=null ? <button onClick={()=>update()}  className='btn btn-success mx-2'>update</button>:''}
    </section>
  ):'';
}

export default ShowLesson
