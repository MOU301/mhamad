import React, { useEffect } from 'react'

const Frag = ({frag,achtung,achtungStyle}) => {

  return (
    <div >
        {frag!='null' ? <h4 className='text-[var(--main-color)] font-bold mb-3 text-xl' >{frag} </h4> :''}
        <span className={`${achtungStyle}  mx-5 text-red-700 animate-pulse3 transition-all transition-normal mb-3 `} >{achtung}</span>
    </div>
  )
}

export default Frag
