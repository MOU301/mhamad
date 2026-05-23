import React, { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'
import { Context } from '../../Context/Context'
const data=[{'text':['one','tow','three','four'],'ubung':['one','tow','three','four']}]

const ubung3= ({id}) => {
    const {next,show,setShow,mach,setMach,shaffel,spaning ,lessonData,lists}=useContext(Context);
    const [text,setText]=useState([]);
    const [anser,setAnser]=useState([]);
    const [ask,setAsk]=useState(null)
    const [anserAlias,setAnserAlias]=useState([]);
    const [shafel,setShafel]=useState([]);
    const [myAnsur,setMyAnsur]=useState([]);
    const [read,setRead]=useState(false);
    const [anserArr,setAnsurArr]=useState(['a','b','c','d','e','f','g','h','i','j','k','l','m'])
    // const [check,setCheck]=useState(false);
    
useEffect(() => {
  if (next == id) {
    const FilterData = lessonData.filter(
      item => (item.number == id && item.type == 'questionAndAnsur')
    );

    if (!FilterData.length) return;   // ← prevent crash

    const item = FilterData[0];

    const text1 = item.text.split('***');
    const anser11 = anserArr.slice(0, item.ansur.length);

    setAnser(item.ansur);
    setAsk(item.ask);
    setText(text1);
    setAnserAlias(anser11);

    if (Number(lists.length - 1) <= lists.indexOf(parseInt(id))) {
      if (myAnsur.length < item.ansur.length) {
        const arrr = Array(item.ansur.length).fill('');
        setMyAnsur(arrr);
      }
      setRead(false);
    } else {
      setRead(true);
    }
  }
}, [next, lists]);

  useEffect(()=>{
    setShafel(shaffel(anser))
  },[anser]);

 
  const handling =(e,index)=>{
  if(!read){
             setMyAnsur(e1=>e1.map((item,i)=>i==index ? item=e.target.value:item))
          }

}

const handlInput=()=>{
   if( lessonData.filter(item=>item.number==id).length>1){
    if(mach){
       if(!read){
   const check=Object.values(myAnsur).every(value=>value!=='');

      if(check){
        setShow(false)
        setRead(true)
      }else{
       setShow(true)
      }
    }
  }
   }else{
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
  



    }
        const styleAnsur = (index) => {
          if (!read) return 'text-[var(--main-color)]';

          const correctLetter = anserAlias[shafel.indexOf(index)] ;
          const userLetter    = myAnsur[index];           

          return userLetter === correctLetter 
              ? "text-green-700"
              : "text-red-700";
      };
    const rrr=useCallback(()=>{
    return text.map((item,index)=>
           <li  key={index}>
                <div className="flex space-y-3 ">
               {/* <input className='fill text-primary mx-2' type="text"  onChange={(e)=>handling(e,index)}  name={`f${index}`}   data-key={index} readOnly={check} maxLength='1'/> */}
                <input className={`${styleAnsur(index)} mx-2 w-[20px] h-[25px] bg-[var(--main-background)] border-1 border-dashed focus:outline-0 text-center`} type="text"  onChange={(e)=>handling(e,index)}    readOnly={read} maxLength='1'/>
                    <span className={read  ? 'text-green-700 mx-2': 'hidden'}>({anserAlias[shafel.indexOf(index)]})</span>
                    <p >{item}</p>
                
                </div>
            </li>)
    },[read,mach,text,next])

  return (
    <Container className={next==id ? 'block':'hidden'}>
        <Frag  achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte wählen Sie die richtige aus"/>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
          <ol >
          {rrr()}
          </ol>
          <ol className=' space-y-3  list-[lower-alpha] list-inside marker:text-[var(--main-color)] marker:font-bold'>
            {shafel.map((item,index)=>
                   
                     <li key={index}>
                        {anser[item]}
                     </li>
                 
            )}
          </ol>
       </div>
        <div>
            <button onClick={()=>handlInput()}  className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">Korrigieren Sie</button>
        </div>
    </Container>
  )
}

export default ubung3
