import React,{useCallback, useContext, useEffect, useState} from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'
import { VscError } from "react-icons/vsc";
import { HiMiniCheck } from "react-icons/hi2";
import { Context } from '../../Context/Context';
import ListItem from '../Elements/listItem';
import { ReceiptEuro } from 'lucide-react';
// const data=[{'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],"ubung":[0,1,0,0,1]}]
const Ubung2 = ({id}) => {
     const [text,setText]=useState([]);
     const [ansur,setAnsur]=useState([]);
    const [myAnsur,setMyAsnur]=useState([]);
    const [read,setRead]=useState(false);
     const [ask,setAsk]=useState(null);
     const {show,setShow,mach,setMach,next,lessonData,lists}=useContext(Context);
   
    useEffect(() => {
  if (next != id) return;

  const numericId = parseInt(id);
  const currentLesson = lessonData.find(
    item => item.number == numericId && item.type == 'trueAndFalse'
  ); 
 
  if (!currentLesson) return;

  setAsk(currentLesson.ask || '');
  setText((currentLesson.text || '').split('***'));
  setAnsur(currentLesson.ansur || []);


  // التأكد من طول myAnsur ومزامنته مع عدد الإجابات
  if (myAnsur.length < (currentLesson.ansur?.length || 0)) {
    setMyAsnur(prev => [
      ...prev,
      ...Array((currentLesson.ansur?.length || 0) - prev.length).fill('')
    ]);
  }

  const lastIndex = lists.length - 1;
  const currentIndex = lists.indexOf(numericId);
  setRead(currentIndex < lastIndex);
}, [next, lists, lessonData]);




const handl=(e,index)=>{
         if(!mach || id>next){
             setMyAsnur(e1=>e1.map((item,i)=>i==index ? item=e.target.value:item))
          }
}

  const handlInput=()=>{
    if(!read){
        const check=Object.values(myAnsur).every(value=>value!='');
        console.log('check',check);
          if(check){
              setShow(false)
              setMach(true)
              setRead(true)
            }else{
               setShow(true)
            }
    }
  

  }
  const styleIcon=(index,type)=>{
  
       if(mach || next>id || read){
         if(myAnsur[index]==type){
           if(myAnsur[index]==ansur[index]){
               return 'text-green-700'
           }
            else{
               return 'text-red-700' 
           }
          
          }else{
            return 'text-gray-500'
          }
    }
    else{
      if(myAnsur[index]==type){
        return 'text-[var(--main-color)]'
      }else{
        return 'text-gray-500'
      }
    }
     
  }
  const rrr=useCallback(()=>{
   
 
     return text.map((item,index)=><li className=' flex '  key={index}>
           {mach ?  <div className='mx-1'>
                                  {ansur[index]=='0' ? <VscError className='text-2xl  text-green-700'/>
                                   :<HiMiniCheck className='text-2xl text-green-700'/>}
                              </div>:''}
                         <span className='mr-3' >{item}</span>
                         <input type="radio" id={`option${index}1`} value={1}  onClick={(e)=>handl(e,index)} hidden />
                              <label  htmlFor={`option${index}1`}><HiMiniCheck className={`text-xl mx-1  ${styleIcon(index,'1')}`} /></label>
                         <input type="radio" id={`option${index}2`}  value={0}  onClick={(e)=>handl(e,index)} hidden/>
                              <label htmlFor={`option${index}2`}> <VscError className={`text-xl ${styleIcon(index,'0')}`}/></label>
                            
              </li>
         )
  },[mach,text,myAnsur,read])
  return (
    <Container className={next==id ? 'block':'hidden'}>
        <Frag achtungStyle={show ? "block":"hidden"}  frag={ask} achtung='Bitte füllen Sie die Felder aus!'/>
        <ul className='my-4 space-y-2'>
          {rrr()}
   
        </ul>
        <div>
            <button onClick={()=>handlInput()}  className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">Korrigieren Sie</button>
        </div>
    </Container>
  )
}

export default Ubung2
