import React,{useCallback, useContext, useEffect, useState} from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'
import { VscError } from "react-icons/vsc";
import { HiMiniCheck, HiMiniCurrencyBangladeshi } from "react-icons/hi2";
import { Context } from '../../Context/Context';
import ListItem from '../Elements/listItem';

// const data=[{'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],"ubung":[0,1,0,0,1]}]
const Test2 = ({id}) => {
  const {test_id,dataTest,fertig,click,setResultTest,resultTest,setPoint}=useContext(Context)
  const [text,setText]=useState([]);
  const [ansur,setAnsur]=useState([]);
const [frag,setFrag]=useState(null);
  const [item,setItem]=useState([])
  const [myAnsur,setMyansur]=useState({});

  useEffect(()=>{
  setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(i=>i.id==id));

  },[])

  useEffect(() => {
    if(item.length>0){
      setFrag(item[0].ask)
        setText(item[0].text.split('***'));
        setAnsur(item[0].ansur)
    }
   
  }, [item])

  useEffect(()=>{
     const newAnsur=Object.values(myAnsur);
    if(newAnsur.length == ansur.length && ansur.length>0){
      if(!resultTest.includes(id)){
        setPoint(prev=>prev+newAnsur.filter((ansurItem, index) => ansurItem == ansur[index]).length);
        setResultTest(prev=>[...prev,id]);
      }
    }
  },[click]);


  const handl=(e,index)=>{
    if(!fertig){
       setMyansur(pre=>({...pre,[index]:e.target.value}))
    }
   
  }   

  const styleIcon=(index,type)=>{

       if(fertig){
        const newAnsur=Object.values(myAnsur);
         if(newAnsur[index]==type){
           if(newAnsur[index]==ansur[index]){
               return 'text-green-700'
           }
            else{
               return 'text-red-700' 
           }
          
          }
    }
    else{
      if(myAnsur[index]==type){
        return 'text-[var(--main-color)]'
      }else{
        return 'text-[var(--second-color)]'
      }
    }
     
  }
  const rrr=useCallback(()=>{
     return text.map((item,index)=><li className='flex'  key={index}>
           {fertig ?  <div className='mx-1'>
                                  {ansur[index]=='0' ? <VscError className='text-4xl  text-green-700'/>
                                   :<HiMiniCheck className='text-4xl text-green-700'/>}
                              </div>:''}
                         <span className='ml-2'>{item}</span>
                         <input type="radio" id={`option${index}1`} value={1}  onClick={(e)=>handl(e,index)} hidden />
                              <label  htmlFor={`option${index}1`}><HiMiniCheck className={`fs-4 ${styleIcon(index,'1')}`} /></label>
                         <input type="radio" id={`option${index}2`}  value={0}  onClick={(e)=>handl(e,index)} hidden/>
                              <label htmlFor={`option${index}2`}> <VscError className={`fs-4 ${styleIcon(index,'0')}`}/></label>
                            
              </li>
         )
  },[myAnsur,fertig,text])
  return (
    <Container >
      {frag!=null ? <h4 className='text-black p-2'>{frag}</h4>:''}
        <ul>
          {rrr()}
        </ul>
  
    </Container>
  )
}

export default Test2
