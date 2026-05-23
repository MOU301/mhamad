import React, { useContext, useEffect, useState ,useCallback} from 'react'
import Frag from '../Elements/Frag';
import Container from '../Elements/Container';
import { Context } from '../../Context/Context';
import { use } from 'react';

const Test5 = ({id}) => { 
    const [text,setText]=useState([]);
    const [ansur,setAnsur]=useState([]);
    const [item,setItem]=useState([])
    const [myAnsur,setMyAnsur]=useState([]);
    const [frag,setFrag]=useState(null);

    const {fertig,dataTest,test_id,click,setResultTest,resultTest,setPoint}=useContext(Context);
useEffect(() => {
  setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(e=>e.id==id));
}, []);

useEffect(()=>{
 if(item.length>0){
  setFrag(item[0].ask)
  setText(item[0].text.split('***'));
  setAnsur(item[0].ansur)
 }
},[item])
 
useEffect(()=>{
const newAnsur=Object.values(myAnsur);
  if(newAnsur.length==ansur.length && newAnsur.length>0){
    if(!resultTest.includes(id)){
        setPoint(prev=>prev+newAnsur.filter((ansurItem, index) => ansurItem == ansur[index]).length);
      setResultTest(prev=>[...prev,id]);
    }
  }
},[click])

    const handlChange=(e,index)=>{
       if(!fertig){
             setMyAnsur(ele=>({...ele,[index]:e.target.value}))
          }
    }

      const styleAnsur=(index)=>{
        const newAnsur=Object.values(myAnsur);
       if(fertig){
   
           if(newAnsur[index]==ansur[index]){
               return 'text-green-700'
           }
            else{
               return 'text-red-700' 
           }  
    }
    else{
        return 'text-[var(--main-color)]'
    }
     
  }
    const rrr=useCallback(()=>{
       return text.map((item,index)=><div className='my-3 p-2' key={index}>{item}<br/>
                   
                      <input
                            className={`${styleAnsur(index)}`}
                            type="text"      
                            onChange={(e) => handlChange(e, index)}
                            value={myAnsur[index]}
                            data-key={index}
                            readOnly={fertig}
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck="false"
                            inputMode="text"
                            style={{ textTransform: "none" }}
                          />

                        <div className={fertig ? ' text-green-700':'hidden'}>
                            ({ansur[index]})
                        </div>
                    </div>)
    },[text,fertig,myAnsur])
 
  return (
      <Container >
                  {frag!=null ? <h4 className='text-black p-2'>{frag}</h4>:''}
                <p>
                   {rrr()} 
                </p>
               
       </Container>
  )
}

export default Test5

