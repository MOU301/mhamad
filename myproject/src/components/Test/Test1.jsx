import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context } from '../../Context/Context'
import Container from '../Elements/Container'


const Test1 = ({id}) => {
 const {test_id,dataTest,fertig,click,setResultTest,resultTest,setPoint}=useContext(Context)
 const [item,setItem]=useState([])
 const [text,setText]=useState('');
 const [ansur,setAnsur]=useState([]);
 const [myAnsur,setMyansur]=useState({});
 const [frag,setFrag]=useState(null);
 
 
 
 useEffect(()=>{
  setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(i=>i.id==id));
  },[])
  useEffect(() => {
    if(item.length>0){
   setFrag(item[0]['ask'])
  setText(item[0].text);
  setAnsur(item[0].ansur);
    }

 
  }, [item])

useEffect(()=>{
  const newAnsur=Object.values(myAnsur);
  if(newAnsur.length === ansur.length && ansur.length>0){
  
    if(!resultTest.includes(id)){
        setPoint(prev=>prev+newAnsur.filter((ansurItem, index) => ansurItem == ansur[index]).length);
      setResultTest(prev=>[...prev,id]);
    }
  }
},[click]);


  const styleAnsur = (index) => {
    // Get sorted values of myAnsur by numeric key order
  const indexOfindex = Object.keys(myAnsur).map(Number).indexOf(index);

    if (fertig) {
      if (myAnsur[index] === ansur[indexOfindex]) {
        return 'text-success'; // ✅ correct answer
      } else { 
        return 'text-danger'; // ❌ wrong answer
      }
    } else {
      return 'text-primary'; // waiting state
    }
  };

  const parseText = (text) => {

   const parts = text.split(/(\*\*\*|\/\/)/);

    
    return parts.map((part, index) => {
      if (part == "***") {
        return <span key={index}>
                {/* <input className='text-primary fill2'  */}
                       <input
                         
                          className={`${styleAnsur(index)} input-test`}
                          type="text"
                          data-key={index}
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck="false"
                          style={{ textTransform: "none" }}
                          onChange={(e) => handlchange(e, index)}
                          value={myAnsur[index]}
                          readOnly={fertig}
                        />

                        <span className={fertig ? ' text-success':'d-none'}>
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
  // const myAnsurKey=Object.keys(myAnsur).sort((a,b)=>a-b).map(Number);
  
  // return ansur[myAnsurKey.indexOf(index)]

}    

const rrr=useCallback(()=>{
return text ? <div className='py-4'>{parseText(text)}</div>:''

},[ansur,text,fertig,click])

const handlchange=(e,index)=>{
   
  setMyansur((prev)=>({...prev,[index]:e.target.value}))
  
}

 
  return item.length>0? 
<Container >
  <div> 
  {frag!=null ?  <h4 className=' text-black' >{frag} </h4>:''}
  <div > {rrr()}</div>
  </div>
</Container> 
   

  :''
}

export default Test1