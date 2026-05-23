import React, { useCallback, useContext, useEffect, useState } from 'react'
import { IoIosAddCircle, IoMdRemoveCircle  } from "react-icons/io";
import { useNavigate, useParams } from 'react-router';
import { Context } from '../context/Context';
import { use } from 'react';


const Choice = () => {
   const {lesson,setLesson,goBack}=useContext(Context) ;
    const [data,setData]=useState([{"ask":'',"ansur":["","",""],"correct":0}]);
    const [ele,setEle]=useState([])
    const [save,setSave]=useState(false)
    const [edit,setEdit]=useState(false);
    const [ask,setAsk]=useState('');
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{

    
      let arr= lesson.filter(item=>item.number==id && item.type=='choice');
      
    if(arr.length>0){
      setEle(arr[0]);
      setEdit(true);
      setData(arr[0].choice)
      setAsk(arr[0].ask);
    }
     },[])
const handlAsk=(e)=>{
  setAsk(e.target.value)
}
   const handlAddAsk=()=>{
    setData(e=>[...e,{"ask":'',"ansur":["","",""],"correct":0}])
   }


    const handlForm=(e)=>{
      e.preventDefault();
        let dataSend={
          number:id,
          type:"choice",
          ask:ask,
          choice:data
        }
        
        if(edit){
          if(ele.hasOwnProperty('id')){
            dataSend={...dataSend,id:ele['id']};
          }
          let arr=lesson.filter(item=>!(item.number==id && item.type=='choice'));
          arr.push(dataSend);
            setLesson(arr);
         }else{
       
          setLesson(item=>[...item,dataSend]);
         }
     navigate(goBack);
    }

   const putAsk=(e,index)=>{
    const e1=e.target.value;
 
    setData(e =>
      e.map((item, i) => {
        // Check if item is valid before updating
        return i === index ? { ...item, ask: e1 } : item;
      })
    );
   }
 const putAnswer = (e, itemIndex, choiceIndex) => {
    const val = e.target.value;
    setData(prev =>
      prev.map((item, i) => {
        if (i !== itemIndex) return item;
        const newAnswers = [...item.ansur];
        newAnswers[choiceIndex] = val;
        return { ...item, ansur: newAnswers };
      })
    );
  };
  const handlChoice=(indexChoice,indexItem)=>{ 
      setData(e=>e.map((item,i)=>{
      return i!==indexItem ? item:{...item,correct:indexChoice}
      }))
 
  }
  const handleRemove=(index)=>{
setData(e=>e.filter((_,i)=>i!=index))

  }
    const buildInput=useCallback(()=>{

     return(data.map((item,index)=>
            <div className='form-control my-2 p-2' key={index}>


               <div className='my-2'>
                    <lebel className='form-lebel' >Ask  {index+1}: </lebel>
                    <IoMdRemoveCircle className='text-danger fs-5' onClick={()=>handleRemove(index)}/>
                    <input type="text" onChange={e=>putAsk(e,index)} value={item.ask||''} className='form-control border-danger' required/>
               </div>
               {item.ansur.map((ele,i)=><div className='my-2 mx-2' key={i}>
                      <div className='mt-3 mb-1'>
                        <label className='form-lebel' > Choice {i+1}:</label>
                        
                        <span className={` mx-5 pointer ${item.correct==i ? 'text-success':'text-danger'}`} onClick={()=>handlChoice(i,index)} >{item.correct==i ?"correct":'uncorrect'}</span>
                      </div>
                     
                        <input type="text"  
                             value={item.ansur[i] || ''}
                             onChange={(e) => putAnswer(e, index, i)} 
                             className='form-control border-success' 
                             required/>
                </div>
               )}
              
           </div>
            )
           )
    },[data])
    useEffect(()=>{
     
      const test = data.every(item =>
    typeof item.ask === 'string' &&
    item.ask.trim() !== '' &&
    Array.isArray(item.ansur) &&
    item.ansur.every(ans => typeof ans === 'string' && ans.trim() !== '') &&
    typeof item.correct === 'number' &&
    !isNaN(item.correct)
  );
if(data.length==0){
  setSave(false);
}else{
  setSave(test)
}
    },[data])

  return (
   <section className='my-5'>
    <div className="container">
        <h3><strong>Choice</strong></h3>
        <form  onSubmit={handlForm}>
          
            <div className='my-2'>
              <label>Ask Text :</label>
              <textarea className='form-control' onChange={(e)=>handlAsk(e)} value={ask}></textarea>
            </div>
            <button className='btn btn-success' onClick={()=>handlAddAsk()}>add ask</button>

            {buildInput()}
           {save ? <button type='submit' className='btn btn-success'>save</button>:''}
        </form>
    </div>
   </section>
  )
}

export default Choice
