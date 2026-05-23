import React, { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import { Context } from '../../Context/Context';
import Frag from '../Elements/Frag';


const Test6 = ({id}) => {
     const {dataTest,test_id,setResultTest,resultTest,setPoint,click,fertig}=useContext(Context);
     const [choice,setChoice]=useState([]);
     const [myAnsur,setMyAnsur]=useState([])
     const [item,setItem]=useState([]);
     const [frag,setFrag]=useState(null)

useEffect(()=>{
    setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(e=>e.id==id));
}, []);

useEffect(()=>{
  if(item.length>0){
    setFrag(item[0].ask)
    setChoice(item[0].choice)
  }
},[item])
            
useEffect(()=>{
  
  if(myAnsur.length === choice.length && choice.length>0){
  
    if(!resultTest.includes(id)){
        setPoint(prev=>prev+choice.filter((ansurItem, index) => ansurItem.correct == myAnsur[index]).length);
      setResultTest(prev=>[...prev,id]);
    }
  }
  
},[click])


 const handlchoice=(indexAnsur,indexAsk)=>{
  const my=myAnsur.slice();
            if(!fertig){
            my[indexAsk]=indexAnsur;
            setMyAnsur(my);
            }
   }
  const styleChoice=(indexAsk,indexchoice)=>{
    if(fertig){
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
        return 'text-[var(--main-color)]  '
      }else{
        return 'text-[var(--second-color)]'
      }
    }
         
  }
 
  const rrr=useCallback(()=>{
    return <div className='p-2'>
         {choice.map((item,index)=><div key={index}>
         <h5>{item.ask}</h5>
         <ol type='a'>
            {item.ansur.map((e,i)=><li className={styleChoice(index,i)} onClick={()=>handlchoice(i,index)} key={i}>{e}</li>)}
         </ol>
          </div>)}
    </div>
  },[choice,myAnsur,fertig])
  return (
   <Container>
           {frag!=null ? <h4 className='text-black p-2'>{frag}</h4>:''}
          {rrr()}
        
   </Container>
  )
}

export default Test6
