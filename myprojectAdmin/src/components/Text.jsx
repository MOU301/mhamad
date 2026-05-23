import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import { useNavigate, useParams } from 'react-router';

const Text = () => {
  const {lesson,setLesson,goBack}=useContext(Context);
  const [text,setText]=useState('');
  const [ele,setEle]=useState([]);
  const [edit,setEdit]=useState(false);
  const [ask,setAsk]=useState('');
  const {id}=useParams();
  const navigate=useNavigate();
  useEffect(()=>{
const arr=lesson.filter(item=>(item.type=='lessonText' && item.number==id));
if(arr.length>0){

setAsk(arr[0].ask)
setText(arr[0].text);
setEle(arr[0]);
setEdit(true)
}

  },[])
  const handlText=(e)=>{
    setText(e.target.value)
  }
  const handlAsk=(e)=>{
setAsk(e.target.value);
  }
  const handlInput=(e)=>{
    e.preventDefault();
    let data={
    number:id,
    type:"lessonText",
    ask:ask,
    text:text,
  }

  if(edit){
    if(ele.hasOwnProperty('id')){
    
        data={...data,id:ele['id']};
      }
      
    const arr=lesson.filter(item=>!(item.type=="lessonText" && item.number==id));
    arr.push(data);
    setLesson(arr)
  }else{
  setLesson(pre=>[...pre,data]);
  }
  
  navigate(goBack);

  }
  return (
  <div className="container my-5">
    <h3><strong className='text-danger'>add Text</strong></h3>
    <form onSubmit={handlInput}>
      <label > <strong>Ask : </strong></label>
      <textarea className='form-control my-2' onChange={(e)=>handlAsk(e)} value={ask}></textarea>
      <label> <strong>Text :</strong></label>
      <textarea className='form-control my-2' onChange={(e)=>handlText(e)} value={text} rows='14'></textarea>
      {text.length>0 ? 
      <button type='submit' className='btn btn-success'> add </button>:""
      }
    </form>
  </div>
  )
}

export default Text
