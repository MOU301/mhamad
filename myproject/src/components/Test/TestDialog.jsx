import React, { useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'

import { Context } from '../../Context/Context'
import { useInRouterContext } from 'react-router'

const TestDialog = ({id}) => {
    const{dataTest,test_id,setResultTest}=useContext(Context);
    const [item,setItem]=useState([])
    const [text,setText]=useState([]);
    const [images,setImages]=useState([]);
    useEffect(() => {
     setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(i=>i.id==id));
    }, []);
useEffect(()=>{
  if(item.length>0){
    setText(item[0].text.split('**'))
    setImages(item[0].src)
    setResultTest((prev)=>prev.includes(id)?prev:[...prev,id]); 
  }
},[item])
useEffect(()=>{
  console.log(images)
},[images])
  return (
    <Container >
        <div >
            {text.map((item,index)=>{
                if(index%2 == 0){
                return <strong className='text-red-700' key={index}>{item} : </strong>
                  }  
                  else{
              
                  return <span key={index}><span>{item}</span><br/></span>
                
                  }
            })}
        </div>
    
        
  

    </Container>
  )
}

export default TestDialog
