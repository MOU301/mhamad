import React, { useCallback, useContext, useEffect, useState } from 'react'
import Frag from '../Elements/Frag';
import Container from '../Elements/Container';
import { Context } from '../../Context/Context';


const Ubung1 = ({id}) => { 
    const [text,setText]=useState('');
    const [ansur,setAnsur]=useState([]);
    const [ask,setAsk]=useState(null);
    const [read,setRead]=useState(false);
    const [myAnsur,setMyansur]=useState({});
    const {show,next,setShow,mach,setMach,lessonData,spaning,lists}=useContext(Context);

    useEffect(() => {

  if (next != id) return;

  const numericId = parseInt(id);
  const currentLesson = lessonData.find(
    item => item.number == numericId && item.type == 'fillText'
  );

  if (!currentLesson) return;

  setAsk(currentLesson.ask || '');
  setAnsur(currentLesson.ansur || []);
  setText(currentLesson.text || '');

  const lastIndex = lists.length - 1;
  const currentIndex = lists.indexOf(numericId);
  setRead(currentIndex < lastIndex);

}, [next, lists, lessonData, myAnsur]);


    

const styleAnsur = (index) => {
    // Get sorted values of myAnsur by numeric key order
  const indexOfindex = Object.keys(myAnsur).map(Number).indexOf(index);

    if (mach || next > id || read) {
      if (myAnsur[index] === ansur[indexOfindex]) {
        return 'text-green-700'; // ✅ correct answer
      } else { 
        return 'text-red-700'; // ❌ wrong answer
      }
    } else {
      return 'text-[var(--main-color)]'; // waiting state
    }
  };

  const parseText = (text) => {
   const parts = text.split(/(\*\*\*|\/\/)/);
    
    return parts.map((part, index) => {
      if (part === "***") {
        return <span key={index}>
                {/* <input className='text-primary fill2'  */}
                       <input
                          className={`${styleAnsur(index)} inline-block border-b-1 border-dashed max-w-[60px]  mx-1 focus:outline-hidden`}
                          type="text"
                          data-key={index}
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck="false"
                          style={{ textTransform: "none" }}
                          onChange={(e) => handlchange(e, index)}
                          value={myAnsur[index]}
                          readOnly={read}
                        />

                        <span className={read ? ' text-green-700':'hidden'}>
                            ({correct(index)})
                        </span>
                    </span>
      } else if (part === "//") {
        return <br key={index} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

const correct=(index)=>{
  const i = Object.keys(myAnsur).map(Number).indexOf(index);
return i >= 0 ? ansur[i] : '';

}

  const handlchange=(e,index)=>{
  setMyansur((prev)=>({...prev,[index]:e.target.value}))
  }


  const handlInput=()=>{
     const myAnsurArr= Object.keys(myAnsur)
              .map(Number)
              .sort((a, b) => a - b)
              
          if(!read){
             if(ansur.length==myAnsurArr.length){

            const check = Object.values(myAnsur).every(value => value.trim() !== '');
                          if(check){
                              setShow(false)
                              setMach(true)
                              setRead(true)
                              }else{
                              setShow(true)
                              }
                     }
                     else{
                      setShow(true)
                     }
             }

    }

const rrr = useCallback(() => {
  return text ? <p className='px-1 my-5'>{parseText(text)}</p> : null;
  //  return text ? <p className='px-1'>{text}</p> : null;
}, [mach, text, read, spaning]);
  return (
      <Container className={next==id ? 'block':'hidden'}>
                <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte füllen Sie die Felder aus! "/>               
             
                    
               {rrr()}
                <div >
                    <button onClick={()=>handlInput()} 
                          className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl"  >
                                Korrigieren Sie
                    </button>
                </div>
       </Container>
  )
}

export default Ubung1
