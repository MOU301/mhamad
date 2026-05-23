import React, { useEffect } from 'react'

const Choice = ({item}) => {

  return (
    <div>
      <h3><strong className='text-danger'>Choice</strong></h3>
      {item.choice.map((ele,index)=> <div key={index}>
        <h5>{ele.ask}</h5>
        <ol type='a'>
          {ele.ansur.map((e,i)=><li key={i} className={`${i==ele.correct ? "text-success":'text-danger'}`}><strong>{e}</strong></li>)}
        </ol>
       </div>
      )}
    </div>
  )
}

export default Choice
