import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import Container from '../Elements/Container';

const Images = ({id}) => {
  const [images,setImages]=useState([]);
  const [ask,setAsk]=useState('');
const {show,next,setShow,mach,setMach,lessonData,spaning,testData}=useContext(Context);
useEffect(() => {
  if (next == id) {
    const currentLesson = lessonData.find(
      item => item.type == 'image' && item.number == id
    );

    if (currentLesson) {
      setImages(currentLesson.src);
      setAsk(currentLesson.ask);

      const fnShow = setTimeout(() => {
        setMach(true);
      }, 1000);

      // تنظيف الـ timeout عند تغيير next أو unmount
      return () => clearTimeout(fnShow);
    }
  }
}, [next, lessonData]);

  // useEffect(()=>{
 
  //   if(next==id){
     
  //     setImages(lessonData.filter(item=>(item.type=='image' && item.number==id))[0].src);
  //     setAsk(lessonData.filter(item=>(item.type=='image' && item.number==id))[0].ask);
  //    let fnShow=setTimeout(function(){
  //       setMach(true);
  //     },1000);
      
  //   }
  // },[next])
  return (
    <Container className={next==id ? 'ubung1':'d-none'}>
      
    <div className='row'>
      {images.map((item,index)=><div className='col-3' key={index}>
          <div className="image">
            <img src={item}/>
          </div>
        </div>
      )}
    </div>
    
    </Container>
  )
}

export default Images
