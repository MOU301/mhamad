import React, { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import { Context } from '../../Context/Context';
import Frag from '../Elements/Frag';

const Choice = ({id}) => {
     const {show,next,setShow,mach,setMach,lessonData,spaning}=useContext(Context);
     const [choice,setChoice]=useState([]);
     const [myAnsur,setMyAnsur]=useState([])
     const [ask,setAsk]=useState(null);
     
     useEffect(()=>{
    if(next == id){
        const dataFilter = lessonData.filter(item => item.number == id && item.type =='choice');
        if(dataFilter.length > 0){
            setChoice(dataFilter[0].choice || []);
            setAsk(dataFilter[0].ask || null);
        } else {
            setChoice([]);
            setAsk(null);
        }
    }
}, [next, lessonData]);

         
          const handlchoice=(indexAnsur,indexAsk)=>{
      
          const my=myAnsur.slice();
          if(!mach || id>=next){
          my[indexAsk]=indexAnsur;
          setMyAnsur(my);
          }
        }
        
          const handlInputt=()=>{
            
            if(myAnsur.length==choice.length){
             
               setMach(true)
              setShow(false)
            }else{
               setShow(true)
            }

  }

  const styleChoice=(indexAsk,indexchoice)=>{
    if((mach || next>id)){
      if(indexchoice==choice[indexAsk].correct){
        return 'text-green-700'
      }else{
        if(myAnsur[indexAsk]==indexchoice){
            return 'text-red-700'
        }
      }
    }
    else{
      if(myAnsur[indexAsk]==indexchoice){
        return 'text-[var(--main-color)]'
      }else{
        return 'text-gray-700'
      }
    }
         
  }
 
  const rrr=useCallback(()=>{
    return <div className='space-y-5 my-3' >
         {choice.map((item,index)=><div key={index}>
         <h5 className='font-blod'>{item.ask}</h5>
         <ol className='list-inside list-[lower-alpha] marker:text-[var(--main-color)] marker:font-bold '>
            {item.ansur.map((e,i)=><li className={styleChoice(index,i)} onClick={()=>handlchoice(i,index)} key={i}>{e}</li>)}
         </ol>
          </div>)}
    </div>
  },[choice,myAnsur,mach])
  return (
   <Container className={next==id ? 'block':'hidden'}>
       <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte wählen Sie die richtige aus"/>
          {rrr()}
        <div>
            <button onClick={()=>handlInputt()}  className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">Korrigieren Sie</button>
        </div>
   </Container>
  )
}

export default Choice
