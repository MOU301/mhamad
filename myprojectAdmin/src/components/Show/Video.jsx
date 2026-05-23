import React, { useEffect } from 'react'

const Video = ({item}) => {

  const TestImage=()=>{
    return typeof item.src[0]=='string' ? true:false;
  }
  
  return (
<>
<h3 className='text-danger'>{item.type}</h3>
   <div className='video' >
    
    <div>
      {item.src[0].includes('<iframe') ?  <div dangerouslySetInnerHTML={{ __html:item.src[0]}}/>: 
   <video controls muted>
        <source src={TestImage() ? item.src[0]:URL.createObjectURL(item.src[0])} type="video/mp4"/>
       
      </video> }
    </div>
   </div></>
  )
}

export default Video
