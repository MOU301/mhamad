import React, { useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'

import { Context } from '../../Context/Context'

const Dialog = ({id}) => {
    const{lessonData,next,setMach,spaning}=useContext(Context);
    const [text,setText]=useState([]);
    const [ask,setAsk]=useState(null);
    const [images,setImages]=useState([]);
    
      
    useEffect(() => {
  if (next == id) {
    const currentLesson = lessonData.find(
      item => item.number == id && item.type == 'dialog'
    );

    if (currentLesson) {
      setAsk(currentLesson.ask);
      setImages(currentLesson.src);
      setText(currentLesson.text.split('**'));
      if(lessonData.filter(item=>item.number==id).length<=1){
         setTimeout(() => {
            setMach(true);
          }, 1000);
      }
      
    }
  }
}, [next, lessonData]);


  return (
    <Container className={next==id ? 'block':"hidden"}>
       <Frag achtungStyle='' frag={ask} achtung='' />
       
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6' >
           <div className='md:col-span-8'>
             {text.map((item,index)=>{
                if(index%2 == 0){
                return <strong className='text-[var(--main-color)]' key={index}>{item} : </strong>
                  }
                  else{
              
                  return <span key={index}><span>{item}</span><br/></span>
                
                  }
            })}
           </div>
           <div className=' md:col-span-4 flex justify-center items-center'>
             <div className='space-y-3'> 
               {images.map(item=><img src={item} className='max-w-full h-auto rounded-lg' />)}</div>
           </div>
        </div>
    
        
  

    </Container>
  )
}

export default Dialog
