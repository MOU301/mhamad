import React, { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'
import { Context } from '../../Context/Context'
// import m1 from '../../assets/test/stuhl.jpg'
// import m2 from '../../assets/test/stift.jpg'
// import m3 from '../../assets/test/radiergummi.jpg'
// import m4 from '../../assets/test/buch.jpg'
// const imagess =[m1,m2,m3,m4];

const Ubung4 = ({id}) => {
    const {show,setShow,lessonData,shaffel,setMach,next,lists}=useContext(Context);
    const [images,setImages]=useState([]);
    const [ubung,setUbung]=useState([]);
    const [ask,setAsk]=useState(null);
    const [myAnsur,setMyAnsur]=useState([]);
    const [read,setRead]=useState(false);
    const [anserShaffel,setAnserShaffel]=useState([]);

    useEffect(() => {
  if (next != id) return;

  const numericId = parseInt(id);
  const currentLesson = lessonData.find(
    item => item.number == numericId && item.type =='fillWithImage'
  );


  if (!currentLesson) return;
  setImages(currentLesson.src || []);
  setAsk(currentLesson.ask || '');
  setUbung(currentLesson.ansur || []);

  // تهيئة myAnsur إذا لم يكن بطول الإجابات
  if (myAnsur.length < (currentLesson.ansur?.length || 0)) {
    setMyAnsur(Array(currentLesson.ansur.length).fill(''));
  }

  const lastIndex = lists.length - 1;
  const currentIndex = lists.indexOf(numericId);
  setRead(currentIndex < lastIndex);
}, [next, lists, lessonData, myAnsur]);


   
    useEffect(()=>{
    setAnserShaffel(shaffel(ubung))
    },[ubung])

    const handlInput=()=>{
        if(!read){
            const check=Object.values(myAnsur).every(value=>value!=='');

          if(check){
            setShow(false)
            setMach(true)
            setRead(true)
          }else{
          setShow(true)
          }
        }
   
    }
    const styleAnsur=(index)=>{
       if(read){

           if(myAnsur[index]==ubung[index]){
               return 'text-green-700 '
           }
            else{
               return 'text-red-700 ' 
           }  
    }
    else{
        return 'text-[var(--main-color)]'
    }
     
  }
  const handlChange=(e,index)=>{
 if(!read){
             setMyAnsur(e1=>e1.map((item,i)=>i==index ? item=e.target.value:item))
          }
  }
const rrr=useCallback(()=>{
return images.map((item,index)=>
               <div  key={index} className='space-y-2  my-4'>
                <div className="w-[100px] h-[100px] overflow-hidden">
            
                    <img src={item} className='w-full h-full '/>
                </div>
                <input
                    className={`${styleAnsur(index)} bg-[var(--main-background)] max-w-[100px] focus:outline-0 border-b-2 border-dashed p-0.5 rounded-t`}
                    type="text"
                    onChange={(e) => handlChange(e, index)}
                    readOnly={read}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="text"
                    style={{ textTransform: "none" }}
                    
                  />

                {/* <input className={`${styleAnsur(index)} mx-1`}  type="text" onChange={(e)=>handlChange(e,index)}  readOnly={read} /> */}
                <div className={read ? 'text-green-700':'hidden'}>({ubung[index]})</div>
               </div>
              )
},[images,read,myAnsur])

  return images.length>0 ? (
    <Container className={next==id ? 'block':'hidden'}>
        <Frag  achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte wählen Sie die richtige aus"/>
        <div>
           <ol className=' my-3 flex flex-cols space-x-2' >
            {anserShaffel.map((item,index)=>
            <li key={index} className='bg-gray-400 px-2 py-0.5 rounded-xl text-[var(--main-background)]'>{ubung[item]}</li>
            )
        }
           </ol>
          <div className='grid grid-cols-2 md:grid-cols-4'>
            {rrr()}
            
          </div>
        </div>
        <div>
            <button onClick={()=>handlInput()}  className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">Korrigieren Sie</button>
        </div>
    </Container>
    ):''
}

export default Ubung4
