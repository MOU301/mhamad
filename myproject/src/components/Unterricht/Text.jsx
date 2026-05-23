import React, { useContext, useState,useEffect } from 'react'
import { Context } from '../../Context/Context';
import Container from '../Elements/Container';
import Frag from '../Elements/Frag';


const LessonText = ({id}) => {
        const {show,next,setShow,mach,setMach,lessonData,spaning}=useContext(Context);
        const [text,setText]=useState([])
        const [ask,setAsk]=useState(null);
        useEffect(()=>{
    
        if(next==id){
            const dataFilter=lessonData.filter(item=>(item.number===id && item.type=='lessonText'));
            setText(dataFilter[0].text.split('//'));
            setAsk(dataFilter[0].ask);
          //  setTimeout(function(){
     
          //   setMach(true);
          //   },1000)
        }
          },[next]);
  return (
         <Container className={next==id ? 'ubung1':'d-none'}>
           <Frag achtungStyle='' frag={ask ?? ''} achtung=""/>
           {text.map((item,index)=><p key={index}>{item}</p>)}
         </Container>
  )
}

export default LessonText
