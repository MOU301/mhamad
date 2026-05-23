import React, { useContext, useEffect, useState ,useCallback} from 'react'
import Frag from '../Elements/Frag';
import Container from '../Elements/Container';
import { Context } from '../../Context/Context';

const WriteSentence = ({id}) => { 
    const [text,setText]=useState([]);
    const [ansur,setAnsur]=useState([]);
    const [ask,setAsk]=useState(null);
    const [myAnsur,setMyAnsur]=useState([]);
    const [read,setRead]=useState(false)
    const {show,next,setShow,mach,setMach,lessonData,spaning,lists}=useContext(Context);

useEffect(() => {
  if (next != id) return;

  const numericId = parseInt(id);
  const currentLesson = lessonData.find(
    item => item.number == numericId && item.type == 'writeSentence'
  );

  if (!currentLesson) return;

  setAnsur(currentLesson.ansur || []);
  setAsk(currentLesson.ask || '');
  setText((currentLesson.text || '').split('***'));

  if (lists.indexOf(numericId) == lists.length - 1) {
    setRead(false);

    if (myAnsur.length < (currentLesson.ansur?.length || 0)) {
      setMyAnsur(Array(currentLesson.ansur.length).fill(''));
    }
  } else {
    setRead(true);
  }
}, [next, lists, lessonData, myAnsur]);

   

    const handlChange=(e,index)=>{
       if(!read){
             setMyAnsur(e1=>e1.map((item,i)=>i==index ? item=e.target.value:item))
          }
    }
    const handlInput=()=>{
        if(!read){
            const check=Object.values(myAnsur).every(value=>value!='');
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
   
           if(myAnsur[index]==ansur[index]){
               return 'text-green-700'
           }
            else{
               return 'text-red-700' 
           }  
    }
    else{
        return 'text-[var(--main-color)] border-gray-700'
    }
     
  }
    const rrr=useCallback(()=>{
       return text.map((item,index)=><div className='my-3 p-2' key={index}>{item}<br/>
                 
                      <input
                            className={`${styleAnsur(index)}  border-b-2 border-dashed w-full focus:outline-0 focus:border-[var(--main-color)]`}
                            type="text"
                            onChange={(e) => handlChange(e, index)}
                            value={myAnsur[index] ?? ""}
                            data-key={index}
                            readOnly={read}
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck="false"
                            inputMode="text"
                            style={{ textTransform: "none" }}
                          />

                        <div className={read ? ' text-green-700':'hidden'}>
                            ({ansur[index]})
                        </div>
                    </div>)
    },[text,read,myAnsur])
 
  return (
      <Container className={next==id ? 'block':'hidden'}>
                <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="please choice the correct  "/>
                <p className='my-3'>
                   {rrr()} 
                </p>
                <div>
                    <button onClick={()=>handlInput()} 
                             className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">
                                Korrigieren Sie
                    </button>
                </div>
       </Container>
  )
}

export default WriteSentence

