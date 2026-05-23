import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router';
import { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import Container from '../Elements/Container';
import Frag from '../Elements/Frag';
// import m1 from '../../assets/test/stuhl.jpg'
// import m2 from '../../assets/test/stift.jpg'
// import m3 from '../../assets/test/radiergummi.jpg'
// import m4 from '../../assets/test/buch.jpg'
// const imagess =[m1,m2,m3,m4];
// const lessonData=[{
//              "number":4,
//              "type":"fillWithImageClick",
//              "ask":"Klicken Sie auf die Bilder und ordnen Sie die Wörter zu.",
//              "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//              "ubung":["stift","buch","radiergummi","stuhl"]
//          },]
const Ubung4Click = ({id}) =>{
        const {show,setShow,setMach,next,lists,mach,lessonData}=useContext(Context);
        const [images,setImages]=useState([]);
        const [ubung,setUbung]=useState([]);
        const [ask,setAsk]=useState(null);
        const [myAnsur,setMyansur]=useState([]);
        const [read,setRead]=useState(false);
        const [shufflArr,setShufflArr]=useState([]);    
         const [clickAnsur,setClickAnsur]=useState(null);
        const [clickFill,setClickFill]=useState(null);
        // const {id}=useParams();

       const shuffleArray = (arr) => {
        const shuffeldArray = arr.slice();
        for (let i = shuffeldArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffeldArray[i], shuffeldArray[j]] = [shuffeldArray[j], shuffeldArray[i]];
        }
        return shuffeldArray;
    }

  useEffect(()=>{
   const arr=lessonData.filter(item=>item.number==id&&item.type=='fillWithImageClick');
     if(arr.length>0){
        setImages(arr[0].src||[]);
        setUbung(arr[0].ubung||[]);
        setAsk(arr[0].ask || '');
     }
  },[]);

   useEffect(() => {
    if (next != id) return;
  
    const numericId = parseInt(id);
    const currentLesson = lessonData.find(
      item => item.number == numericId && item.type =='fillWithImageClick'
    );
  
  
    if (!currentLesson) return;
    setImages(currentLesson.src || []);
    setAsk(currentLesson.ask || '');
    setUbung(currentLesson.ansur || []);

  
    const lastIndex = lists.length - 1;
    const currentIndex = lists.indexOf(numericId);
    setRead(currentIndex < lastIndex);
  }, [next, lists, lessonData, myAnsur]);

  useEffect(() => {
      setShufflArr(shuffleArray(ubung));
      },[ubung]);


    const handlInput=()=>{

     const myAnsurArr= Object.keys(myAnsur)
              .map(Number)
              .sort((a, b) => a - b)
            
          if(!read){
             if(ubung.length==myAnsurArr.length){
                  setShow(false)
                  setMach(true)
                  setRead(true)           
                }else{
                 setShow(true)
                }
            }

      }

  const handleClickAnsur=(index)=>{
       if(next>id || mach) return;
           setClickAnsur(index)
         
       }
       const handleClickFill=(index)=>{
        if(next>id || mach) return;
          setClickFill(index)
        
        
       }
useEffect(()=>{
          if(clickAnsur!=null&&clickFill!=null){
 
           setMyansur(pre=>({
            ...pre,
            [clickFill]:clickAnsur
           }))
           setClickAnsur(null);
           setClickFill(null);
         }
          
       },[clickAnsur,clickFill])
       
       const styleClickAnsur=(index)=>{
         if(clickAnsur==index){
            return ' bg-gray-700 ';
         }else{
           if(Object.values(myAnsur).includes(index)){
            return 'bg-gray-400';
           }else{
            return 'bg-[var(--main-color)] text-[var(--main-background)]';
           }
         }
        }
        const styleClickFill=(index)=>{
            if(clickFill==index){
                return 'bg-gray-700 text-white';
            }else{
                return 'bg-gray-400 text-main';
            }
        }
    const styleAnsur = (index) => {
  
  const indexOfindex = Object.keys(myAnsur).map(Number).indexOf(index);

    if (read) {
      if (shufflArr[myAnsur[index]] === ubung[indexOfindex]) {
        return 'text-green-700'; // 
      } else { 
        return 'text-red-700'; //
      }
    } else {
      if(clickFill==index){
                return 'text-bold text-gray-700';
            }else{
                return'text-[var(--main-color)]';
            }
    }
  };

const rrr=useCallback(()=>{
      return <>

        {shufflArr.map((item,index)=>(
            <button key={index} className={` ${styleClickAnsur(index)}  text-white mx-1 my-2 py-0.5 px-2 rounded-xl`} onClick={()=>handleClickAnsur(index)}>{item}</button>
          ))}
    
      <div className="grid grid-cols-2 md:grid-cols-4">
        {
         images.map((item,index)=>
               <div className='space-y-2  my-4' key={index}>
                <div className="w-[100px] h-[100px] overflow-hidden">
                    <img src={item} className='w-full h-full'/>
                </div>
                 <span  >
                    <button className={`${styleAnsur(index)} w-[100px] border-b-2 border-dashed bg-[var(--main-background)] `} onClick={()=>handleClickFill(index)}>
                        {myAnsur[index]!==undefined ? shufflArr[myAnsur[index]] : `_____`}
                    </button>
                </span>

                

                <div className={read ? 'text-green-700':'hidden'}>({ubung[index]})</div>
               </div>
              )
         }
         </div>
         </>
},[images,ubung,myAnsur,read,clickAnsur,clickFill,shufflArr]);
  return (
    // <Container className="ubung4 my-5">
    <Container className={next==id ? 'block':'hidden'}>
       <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte ordnen Sie die Wörter zu! "/>
  
       {rrr()}
       <div>
        <button onClick={()=>handlInput()} 
                 className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">
                    Korrigieren Sie
        </button>
        </div>

    </Container>
  )
}

export default Ubung4Click