import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import Container from '../Elements/Container';
import Frag from '../Elements/Frag';

// const lessonData=[{
//              "number":3,
//              "type":"questionAndAnsurClick",
//               "ask":"Ziehen Sie die Wörter in die richtigen Felder.",
//               "text":"Guten Morgen *** Wie geht es Ihnen *** wie heißt du ? *** woher kommst du ? ",
//               "ansur":["Guten Morgen","mir geht es gut ","Ich heiße Anna","Ich komme aus Deutschland"],
//           }]
  const anArr=['a','b','c','d','e','f','g','h','i','j','k','l','m'] 
const Ubung3Click = ({id}) => {
  // const {id}=useParams();
  const [ask,setAsk]=useState(null);
  const [text,setText]=useState([]);
  const [ansur,setAnsur]=useState([]);
  const [shufflArr,setShufflArr]=useState([]);
  const [myAnsur,setMyansur]=useState([]);
  const [read,setRead]=useState(false);

 

  const [fillClick,setFillClick]=useState(null);
   const [ansurClick,setAnsurClick]=useState(null);

  const {show,setShow,setMach,next,lists,mach,lessonData}=useContext(Context);


//  useEffect(()=>{

 
//       if(arr.length>0){
//           setAsk(arr[0].ask || '');
//           setText(arr[0].text.split('***') || []);
//           setAnsur(arr[0].ansur || []);
//       }
//  },[])
 useEffect(() => {
   if (next != id) return ;
     const arr = lessonData.filter(
       item => (item.number == id && item.type == 'questionAndAnsurClick')
     );
 
     if (!arr) return;   // ← prevent crash

    if(arr.length>0){
          setAsk(arr[0].ask || '');
          setText(arr[0].text.split('***') || []);
          setAnsur(arr[0].ansur || []);
      }
 
     if (Number(lists.length - 1) <= lists.indexOf(parseInt(id))) {
       setRead(false);
     } else {
       setRead(true);
     }
   
 }, [next, lists]);

 useEffect(()=>{
  if(ansur.length>0){
 setShufflArr(shuffleArray(ansur))
  }
  
 },[ansur])

 const shuffleArray = (arr) => {
    const shuffeldArray = arr.slice();  
    for (let i = shuffeldArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffeldArray[i], shuffeldArray[j]] = [shuffeldArray[j], shuffeldArray[i]];
    } 
    return shuffeldArray;
}

const handleFillClick=(index)=>{
if(mach || next>id){
  setFillClick(null)
}else{
  setFillClick(index)
}
  
}
const handleAnsusurClick=(index)=>{
   if(mach || next>id){
     setAnsurClick(null);
   }else{
     setAnsurClick(index);
   }
    
}
useEffect(()=>{
  if(fillClick!=null && ansurClick!=null){
    setMyansur(pre=>({...pre,[fillClick]:ansurClick}))
    setFillClick(null);
    setAnsurClick(null);
  }
},[fillClick,ansurClick])
const styleFill = (index) => {
  if (!read) {
    if (fillClick === index) return "   bg-gray-700 text-white";
    if (myAnsur[index] !== undefined) return "bg-gray-400";
    return "bg-[var(--main-color)] text-[var(--main-background)]";
  } else {

    if (myAnsur[index] === undefined) return "text-red-700 bg-gray-400";

    const chosenAnswerIndex = myAnsur[index];
    const correctAnswer = ansur[index];
    const chosenAnswer = shufflArr[chosenAnswerIndex];

    return correctAnswer === chosenAnswer
      ? "text-green-700 bg-gray-400"
      : "text-red-700 bg-gray-400";
  }
};

const styleAnsur=(index)=>{
  if( ansurClick==index ){
      return 'text-gray-700'
  }else{
    if( Object.values(myAnsur).includes(index)){
      return 'text-gray-500'
    }else{
     return 'text-[var(--main-color)]  '
    }
   
 
      
    
    
  }
  
}
const rrr=useCallback(()=>{
  
  

    return (
      <div className='grid md:grid-cols-2 '>
        <div className='my-3'>
          {
          text.map((item,index)=>
            <li  key={index} className='flex space-y-3 '>
                  
                      <button className={`  ${styleFill(index)}  w-[20px] h-[25px] mr-2  rounded-xl cursor-pointer`} onClick={()=>handleFillClick(index)}>
                          {myAnsur[index] !== undefined ? anArr[myAnsur[index]]: `_`}
                      </button>

                      <span className={`${read ? 'text-green-700':'hidden'} mx-2`}>({anArr[shufflArr.indexOf(ansur[index])]})</span>

                      <p >{item}</p>
                  
            </li> 
            )
          }
        </div>
        <ol className='space-y-3  list-[lower-alpha] list-inside marker:text-[var(--main-color)] marker:font-bold' >
          {shufflArr.map((item,index)=>
          <li key={index}  >

             
                  <span  onClick={()=>handleAnsusurClick(index)} className={`${styleAnsur(index)} cursor-pointer`}>
                    
                       {item}
                        
                  </span>
              
      
          </li>)}
        </ol>
      </div>
)
   
  },[text,ansur,shufflArr,myAnsur,read,fillClick,ansurClick]);



const handleInput=()=>{
const myAnsurArr= Object.keys(myAnsur)
              .map(Number)
              .sort((a, b) => a - b)
            
          if(!read){
             if(ansur.length==myAnsurArr.length){
                  setShow(false)
                  setMach(true)
                  setRead(true)           
                }else{
                 setShow(true)
                }
            }

      } 
  return (
    // <Container className="ubung3 my-5">
    <Container className={next==id ? 'block':'hidden'}>
       <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte füllen Sie die Felder aus! "/>   
           {rrr()}
           <div >
              <button onClick={()=>handleInput()} 
                       className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">
                          Korrigieren Sie
              </button>
           </div>
    </Container>
  );
}
  
export default Ubung3Click