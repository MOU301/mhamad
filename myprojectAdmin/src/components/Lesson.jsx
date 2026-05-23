import React, {useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import { Context } from '../context/Context';
import axiosInstance from '../Api/api';


const Lesson = ({type}) => {
    const {lesson,adminInfo,lessonData,setLesson,login,back,setGoBack,setMycourses}=useContext(Context);
    const [id,setId]=useState(1);
    const [title,setTitle]=useState('');
    const [numberLesson,setNumberLesson]=useState(null);
    const [course_id,setCourse_id]=useState(null);
   const [newL,setNewL]=useState(false);
   const [update,setUpdate]=useState(false);

  
    const navigate=useNavigate();


    useEffect(()=>{
      console.log('type is ',type);
  
        if(lessonData.length>0){
          setTitle(lessonData[0].title);
          setNumberLesson(lessonData[0].number)
        }
    const url=window.location.pathname;
    const regex = /^\/course\/\d+\/lesson\/\d+$/;
    const regex11=/^\/course\/\d+\/test\/\d+$/;
    const regex1=/^\/course\/\d+$/;
    (regex.test(back) || regex11.test(back) )? (setUpdate(true),setTitle(lessonData[0].title),setNumberLesson(lessonData[0].number)):setUpdate(false);
    regex1.test(back) ? setNewL(true): setNewL(false);
    
  setCourse_id(url.split('/')[2]);

    
    if(lesson.length>0){
            let arr=lesson.reduce((a,c)=> a.number>c.number ? a:c);
         setId(Number(arr.number)+1);
        }else{
        setId(1);
        }     
     setGoBack(url);
    },[])


const handlingId=(e)=>{
        e.target.value>0 ? (setId(e.target.value)):'';
} 
const styleLink=(type)=>{
   return lesson.filter(item=>item.type==type).length>0 ? 'btn btn-success m-2':'btn btn-dark m-2';
}
const remove=async (id,index)=>{
  if(id==null){
     const newLesson=lesson.filter((_,i)=>index!=i);
     setLesson(newLesson);
  }else{
    await axiosInstance.delete(`/api/lessondatas/${id}`).then(res=>{
       if(res.data.message=='success'){
        const newLesson=lesson.filter((_,i)=>index!=i);
        setLesson(newLesson);
       }
    }).catch(error=>console.log(error));
  }


}
const handleName=(e)=>{
setTitle(e.target.value);
}
const Save=async()=>{

   const formData = new FormData();

   
 formData.append('type',type);
   formData.append('name',title);
   formData.append("number",Number(numberLesson));
 
   lesson.forEach((item, index) => {
       for (const key in item) {
        
        if((key === 'src' || key === 'ansur') && Array.isArray(item[key])){ 
            item[key].forEach((e,i)=>{
            
                if(e!=null){
                 
               formData.append(`lesson_data[${index}][${key}][${i}]`,e);
        }}) 
        }else if(key=='bot' || key=='choice'){
          item[key].forEach((e,i)=>{
            for (const k in e){
              if(k=='ansur'){
                e[k].forEach((ee,ii)=>{
                  formData.append(`lesson_data[${index}][${key}][${i}][${k}][${ii}] `,ee)

                }) 
              }else{
                formData.append(`lesson_data[${index}][${key}][${i}][${k}]`,e[k])
              }
            }
          })
    
        }
        else{
          
           formData.append(`lesson_data[${index}][${key}]`,item[key]);
        }
      }
   });
   
    if(lesson.length>0){

        if(newL){
//     for (let pair of formData.entries()) {
//   console.log(pair[0] + ':', pair[1]);
// }
        const response=  await axiosInstance.post(`/api/course/${course_id}/lesson`,formData);
                console.log(response.data);
          if(response.data.message=='success'){
            const rrr=  await axiosInstance.get(`/api/allCourses`);
                          setMycourses(rrr.data.data);
                          setLesson([]);
                 
                          navigate(`/course/${course_id}`);
          }
        
   
           
        }if(update){
          formData.append('_method', 'PATCH');
          const lesson_id=lessonData[0].id;
          formData.append("id",lesson_id);
              for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
              }
          
          const response=  await axiosInstance.post(`/api/course/${course_id}/lesson/${lesson_id}`,formData);
          
             if(response.data.message=='success'){
                   const rrr= await axiosInstance.get(`/api/allCourses`)
                   
                     
                          setMycourses(rrr.data.data);
                          setLesson([]);
                          navigate(`/course/${course_id}`);      
              } 
        }
    }
   
  
}
const handleInc = (index) => {
  const updatedLesson = lesson.map((item, i) => {
    if (i === index) {
      return { ...item, number: (Number(item.number) + 1).toString() };
    }
    return item;
  })
  .sort((a, b) => Number(a.number) - Number(b.number)); // sort after updating
  setLesson(updatedLesson);
};

const handleDec = (index) => {
  const updatedLesson = lesson.map((item, i) => {
    if (i === index && item.number!=1) {
      return { ...item, number: (Number(item.number) - 1).toString() };
    }
    return item;
  })
  .sort((a, b) => Number(a.number) - Number(b.number)); // sort after updating
  setLesson(updatedLesson);
};

  return login ? (
   <section className='container my-3'>
   {/* in this page must to be nuber the old unung and the nmber the id  */}
    <div className='d-flex'>
        <h3><strong>Number of {type }:</strong></h3>
        <input type="number" onChange={(e)=>setNumberLesson(e.target.value)} value={numberLesson!=null ? numberLesson:''} name='number_lesson' placeholder='number of lesson'/>
     </div>
     <div className='d-flex my-2'><h3><strong>Name of {type}  :</strong></h3>
       <input type="text" onChange={(e)=>handleName(e)} value={title!=null ? title:''} placeholder='name of lessson'/>
     </div>
    
    <label className='label-control my-2' htmlFor="order">number of upung :</label><br/>
    <input  onChange={(e)=>handlingId(e)} value={id!=null ? id: ''} id='order' type="number"  placeholder='enter the order'/>
    <h4>please choise the component </h4>
        {id>0 ? ( <>
            
            <NavLink className={styleLink('fillText')} to={`/fillText/${id}`}>fillText</NavLink>
            <NavLink className={styleLink('fillTextClick')} to={`/fillTextClick/${id}`}>fillTextClick</NavLink>
            <NavLink className={styleLink('fillWithImage')} to={`/fillWithImage/${id}`}>fillWithImage</NavLink>
            <NavLink className={styleLink('fillWithImageClick')} to={`/fillWithImageClick/${id}`}>fillWithImageClick</NavLink>
            <NavLink className={styleLink('audio')} to={`/audio/${id}`}>addAudio</NavLink>
            <NavLink className={styleLink('trueAndFalse')} to={`/trueAndFalse/${id}`}>trueAndFalse</NavLink>
            <NavLink className={styleLink('questionAndAnsur')} to={`/questionAndAnsur/${id}`}>questionAndAnsur</NavLink>
            <NavLink className={styleLink('questionAndAnsurClick')} to={`/questionAndAnsurClick/${id}`}>questionAndAnsurClick</NavLink>

            <NavLink className={styleLink('dialog')} to={`/dialog/${id}`}>addDialog</NavLink>
            <NavLink className={styleLink('writeSentence')} to={`/writeSentence/${id}`}>writeSentece</NavLink>
            <NavLink className={styleLink('writeSentenceClick')} to={`/writeSentenceClick/${id}`}>writeSentenceClick</NavLink>
            <NavLink className={styleLink('choice')} to={`/choice/${id}`}>choice</NavLink>

            
           
            
            {type=='lesson' ? (
             <>
             <NavLink className={styleLink('video')} to={`/video/${id}`}>addVideo</NavLink>
             <NavLink className={styleLink('bot')} to={`/Bot/${id}`}>addBot</NavLink>
             <NavLink className={styleLink('grammatik')} to={`/grammatik/${id}`} >grammatik</NavLink>
             <NavLink className={styleLink('image')} to={`/image/${id}`}>Add images</NavLink>
             <NavLink className={styleLink('text')} to={`/lessonText/${id}`}>text</NavLink>
             </>
            ):''}
            
            
        </>
    ):(<p>you must put id to new ubung !!</p>)}



    <div className='my-5 show'>
      {lesson.map((item,index)=><div className='p-2 m-2 bg-success d-flex justify-content-between' key={index}>
                           <div>
                            <strong className='text-white' > {item.number} - </strong>
                             <NavLink to={`/${item.type}/${item.number}`}><span className='text-white'>{item.type} </span></NavLink>
                            <strong className='mx-5  text-white'>
                                <button className='mx-3 btn-danger btn' onClick={()=>handleInc(index)}>+</button>
                                <button className='mx-3 btn btn-danger' onClick={()=>handleDec(index)}>-</button>
                            </strong>
                            
                           </div>
                             <button className='btn btn-danger' onClick={()=>remove(item.id ? item.id:null,index)}>Delete</button>  
                                </div>)
       }

    </div>
   {(lesson.length>0 && title!='' && numberLesson!='') ? (<div>
    <button onClick={()=>Save()} className='btn btn-success'>Save</button>
    <NavLink to='/show' className='btn btn-success mx-2'>show lesson now </NavLink>

   </div>):<NavLink to='/myCourses' className='btn btn-success mx-2'>home</NavLink>
  }
</section>
  ):'';
}

export default Lesson
