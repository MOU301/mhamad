import React, { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import { Context } from '../../Context/Context'
import { use } from 'react';

const Test4 = ({id}) => {
    const {dataTest,test_id,shaffel,fertig,click,resultTest,setResultTest,setPoint}=useContext(Context);
    const [item,setItem]=useState([])
    const [images,setImages]=useState([]);
    const [ansur,setAnsur]=useState([]);
    const [myAnsur,setMyAnsur]=useState([]);
    const [frag,setFrag]=useState(null);

    const [anserShaffel,setAnserShaffel]=useState([]);
    useEffect(() => {
   setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(e=>e.id==id));
}, []);

useEffect(()=>{
   if(item.length>0){
    setFrag(item[0].ask)
    setAnsur(item[0].ansur)
    setImages(item[0].src)
    }
},[item])
   
    useEffect(()=>{
      setAnserShaffel(shaffel(ansur))
    },[ansur])
   

  useEffect(()=>{
   const newAnsur=Object.values(myAnsur);
   if(newAnsur.length==ansur.length && ansur.length>0){
      if(!resultTest.includes(id)){
        setResultTest(prev=>[...prev,id]);
        setPoint(prev=>prev+newAnsur.filter((ansurItem, index) => ansurItem == ansur[index]).length); 
      }
   }
  },[click])

    
    const styleAnsur=(index)=>{
      const newAnsur=Object.values(myAnsur)
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
  const handlChange=(e,index)=>{

     
 if(!fertig){
           setMyAnsur(prev=>({...prev,[index]:e.target.value})) 
          }
  }

const rrr=useCallback(()=>{
return images.map((item,index)=>
               <div className="w-1/2 sm:w-1/3 md:w-1/4  " key={index}>
                <div className="w-full h-48 flex items-center justify-center">
            
                    <img src={`../src/assets/test/${item}`}/>
                </div>
                <input
                    className={`${styleAnsur(index)} mx-1`}
                    type="text"
                    onChange={(e) => handlChange(e, index)}
                    readOnly={fertig}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="text"
                    style={{ textTransform: "none" }}
                  />

                {/* <input className={`${styleAnsur(index)} mx-1`}  type="text" onChange={(e)=>handlChange(e,index)}  readOnly={read} /> */}
                <div className={fertig ? 'text-green-700':'hidden'}>({ansur[index]})</div>
               </div>
              )
},[images,fertig,myAnsur])

  return images.length>0 ? (
    <Container>
            {frag!=null ? <h4 className='text-black p-2'>{frag}</h4>:''}
        <div>
           <ol className=' my-3' >
            {anserShaffel.map((item,index)=>
            <li key={index} className='mx-1'>{ansur[item]}</li>
            )
        }
           </ol>
          <div className='flex flex-col my-2 mx-1'>
            {rrr()}
            
          </div>
        </div>
      
    </Container>
    ):''
}

export default Test4