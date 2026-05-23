import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'

const Next = () => {
  const {next,mach,num,setMach,setShow,setNext}=useContext(Context);
  const handlNext=()=>{
    setMach(false);
    setShow(false);
    setNext(e=>e+1);
}
  return (
    <div >
      <button className={`${(mach && next <num) ? 'block':'hidden'} w-10 bg-[var(--main-color)] text-[var(--main-background)] px-1 py-0.5 rounded-xl mx-2 font-bold `} onClick={()=>handlNext()}>
         <span className='inline-block animate-move'> →</span> 
      </button>
    </div>
  )
}

export default Next
