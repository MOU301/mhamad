import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import { useNavigate} from 'react-router'
import { IoAddCircleOutline } from "react-icons/io5";

const AddFiles = ({type,id}) => {
  const {lesson,setLesson,goBack}=useContext(Context)

  const [file,setFile]=useState([]);
  const [start,setStart]=useState(null);
  const [end,setEnd]=useState(null);
  const [ele,setEle]=useState([]);
  const [ele1,setEle1]=useState({});
  const [edit,setEdit]=useState(false);
  const [ask,setAsk]=useState(null);
  const [link,setLink]=useState(false);
  const [text,setText]=useState(null);
  const [getLink,setGetLink]=useState(false);
  const navigate=useNavigate();
  
  useEffect(()=>{
     const arr=lesson.filter(item=>(item.type==type && item.number==id))
   
     if(arr.length>0){ 
   
      if(arr[0].src.includes('<iframe')){
        setText(arr[0].src)
        setGetLink(true);
        setLink(true);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
       
      }else{
      setEle(arr[0].src);
      }
    
      setAsk(arr[0].ask);
      setEle1(arr[0])
      setEdit(true)
     }
  },[])
  const TestImage=(item)=>{
    if(typeof item=='string'){
      return true;
    }else{
      return false
    }

}
  const handlingFile=(e)=>{

   setFile([])
  setEle([e.target.files[0]]);

  }
  const timeToSeconds = (time) => {
  if (!time) return null;

  const [m, s] = time.split(":").map(Number);
  if (isNaN(m) || isNaN(s) || s > 59) return null;

  return m * 60 + s;
};
const handlAsk=(e)=>{
setAsk(e.target.value);
}
  const SendData=()=>{
    let data={};
    if(text!=null){
      const match = text.match(/src="([^"]+)"/);
      let newText=text
if (match) {
  let src = match[1];
  if(start!=null && end!=null){
    const newSrc = `${src}&start=${timeToSeconds(start)}&end=${timeToSeconds(end)}&controls=0&modestbranding=1&rel=0&autoplay=1`;
   newText = newText.replace(/src="[^"]+"/, `src="${newSrc}"`);
  }else{
     const newSrc = `${src}&controls=0&modestbranding=1&rel=0&autoplay=1`;
   newText = newText.replace(/src="[^"]+"/, `src="${newSrc}"`);
  }

  
}
  data={
      number:id,
      type:type,
      ask:ask,
      src:[newText],
    }
 
    console.log(newText);
    }else{
      data={
            number:id,
            type:type,
            ask:ask,
            src:file,
          }
    }


    if(edit){
      if(ele1.hasOwnProperty('id')){

          data={...data,id:ele1['id']};
        }
      
      const arr=lesson.filter(item=>!(item.number==id && item.type==type));
      arr.push(data);
     setLesson(arr);
    }else{
      setLesson(pre=>[...pre,data])
    }

    navigate(goBack);
  }

  useEffect(()=>setFile([...ele]),[ele.length]);
 
const remove=()=>{
setEle([]);
setGetLink(false)
setText('');


}
const handlText=(e)=>{
  setText(e.target.value)
}
const handlLink=()=>{

  setGetLink(true)
}


  return (
   <section className="container addVideo">
      <h5>{`Add new ${type}`} </h5>
            <div className='my-2'>
              <label>Ask Text :</label>
              <textarea className='form-control' onChange={(e)=>handlAsk(e)} value={ask}></textarea>
            </div>
            <label className='btn btn-success' htmlFor='addImage' >
              <IoAddCircleOutline className='fs-4' /> {`add ${type}`}
              </label>
              <input  id='addImage' onChange={(e)=>handlingFile(e)} accept='video'  type="file" hidden/>
                <label className='btn btn-success mx-2' onClick={()=>{setLink(e=>!e);setText(null)}} >
              {!link ? <IoAddCircleOutline className='fs-4' />:''} {`add Link ${type}`}
              </label>
              {link ? <>
              <input type="text" id='addLink' className='form-control my-2' value={text} onChange={(e)=>handlText(e)} placeholder='<iframe  ... .. ..></iframe> '/>
              {text!=null ? <>
                <button className='btn btn-dark ' onClick={()=>handlLink()}>get {type}</button>
                <div className="my-1">
                  <label>Start (mm:ss):</label>
                  <input
                    type="text"
                    placeholder="01:32"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>

                <div className="my-1">
                  <label>End (mm:ss):</label>
                  <input
                    type="text"
                    placeholder="02:40"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                {/* <div className='my-1'>
                   <label> start (second) :</label>
                   <input type='number' onChange={(e)=>setStart(e.target.value)} value={start} placeholder='32'/>
               </div>
               <div className='my-1'>
                  <label >end (second) : </label>   
                  <input type="number" onChange={(e)=>setEnd(e.target.value)} value={end} placeholder='40'/>
               </div> */}
              </>:''}
            
              </>
              :''}
          
               <div className='video d-flex justify-content-center'>
                  {file.length>0 ?  file.map((item,index)=>type=='video' ?  
                             (<video width="320" height="240" controls key={index}>
                                    <source src={TestImage(item) ? item:URL.createObjectURL(item)} type="video/mp4"/>
                               </video>):(
                                <>
                                {type=='audio' ? 
                                  <audio key={index} controls>
                                      <source  src={TestImage(item) ? item:URL.createObjectURL(item)} type='audio/mp3'/>
                                  </audio>
                                  :
                                  <div className='image' key={index}>
                                      <img src={TestImage(item) ? item:URL.createObjectURL(item)} />
                                    </div>
                            
                                 } 
                                </>
                              )):''
                   }
                   <div dangerouslySetInnerHTML={{ __html: getLink ? text : '' }}/>
                <button onClick={()=>remove()}  className={(ele.length>0 )? 'btn btn-danger':'d-none'}>x</button>

               </div>
             
               <div onClick={()=>SendData()} className={(file.length>0 || text!=null) ? 'btn btn-success':'d-none'}>{edit ? "Update":"Done"}</div>
   </section>
  )
}

export default AddFiles
