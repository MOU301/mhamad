import React, { useEffect ,useContext,useCallback,useState} from 'react'
import { Context } from '../../Context/Context'
import Container from '../Elements/Container';
import { use } from 'react';


const Test3 = ({id}) => {
 const {fertig,shaffel,dataTest,click,test_id,resultTest,setResultTest,setPoint}=useContext(Context);
    const [text,setText]=useState([]);
    const [ansur,setAnsur]=useState([]);
    const [anserAlias,setAnserAlias]=useState([]);
    const [shafel,setShafel]=useState([]);
    const [myAnsur,setMyAnsur]=useState([]);
   const [item,setItem]=useState([]);
   const [frag,setFrag]=useState(null)
    const [anserArr,setAnsurArr]=useState(['a','b','c','d','e','f','g','h','i','j','k','l','m'])

 useEffect(()=>{
  setItem(dataTest.filter(e=>e.id==test_id)[0].lesson_data.filter(i=>i.id==id));
  },[])
 

  useEffect(() => {
    if(item.length>0){
      setFrag(item[0].ask)
        setText(item[0].text.split('***'))
        setAnsur(item[0].ansur)
        setAnserAlias(anserArr.slice(0,item[0].ansur.length))
    }
   
  }, [item])
  
  useEffect(()=>{
    setShafel(shaffel(ansur))
  },[ansur]);

  useEffect(()=>{
      const newAnsur=Object.values(myAnsur);  
    // const correctLetter = anserAlias[shafel.indexOf(index)] ;// الحرف الصحيح
    //       const userLetter    = newAnsur[index]; 
    if(newAnsur.length == ansur.length && ansur.length>0){
      if(!resultTest.includes(id)){

        setPoint(prev=>prev+newAnsur.filter((ansurItem, index) => ansurItem == anserAlias[shafel.indexOf(index)]).length);
        setResultTest(prev=>[...prev,id]);
      }
    }
  },[click])
 
const handling=(e,index)=>{
    if(!fertig){
       setMyAnsur(pre=>({...pre,[index]:e.target.value.toLowerCase()})) 
    } 
  }

        const styleAnsur = (index) => {
          if (!fertig) return 'text-primary';

          const correctLetter = anserAlias[shafel.indexOf(index)] ;// الحرف الصحيح
          const userLetter    = myAnsur[index];            // حرف المستخدم

          return userLetter === correctLetter 
              ? "text-success"
              : "text-danger";
      };



    const rrr=useCallback(()=>{
    return text.map((item,index)=>
           <li  key={index}>
                <div className="flex ">
                <input className={`${styleAnsur(index)} mx-2`} type="text"  onChange={(e)=>handling(e,index)}    readOnly={fertig} maxLength='1'/>
                    <span className={fertig  ? 'text-green-700 mx-2': 'hidden'}>({anserAlias[shafel.indexOf(index)]})</span>
                    <p >{item}</p>
                
                </div>
            </li>)
    },[myAnsur,text,fertig])

  return (
    <Container >
            {frag!=null ? <h4 className='text-black p-2'>{frag}</h4>:''}
       <div className='flex flex-col md:flex-row gap-4'>
          <ol className=' w-full md:w-1/2 px-2'>
          {rrr()}
          </ol>
          <ol className='w-full md:w-1/2 ' type='a'>
            {shafel.map((item,index)=>
                  <div key={index}> 
                     <li>
                        <p>{ansur[item]}</p>
                     </li>
                  </div>
            )}
          </ol>
       </div>
      
    </Container>
  )
}


export default Test3