
import { useCallback, useEffect, useState ,useContext} from 'react'
import { Context } from '../../Context/Context';    
import { useParams } from 'react-router';
import Container from '../Elements/Container';
import Frag from '../Elements/Frag';


// const lessonData=[{
//              "number":5,
//              "type":"writeSentenceClick",
//              "ask":"Schreiben Sie den Satz in der richtigen Reihenfolge.",
//              "text":"Das ist ein schöner Tag***Ich komme aus dem Irak***Er heißt Ahmad ",
//          },]
const WriteSentenceClick = ({id}) => {
    const {show,setShow,setMach,next,lists,mach,lessonData}=useContext(Context);
    const [ask,setAsk]=useState('');
    const [ansur,setAnsur]=useState([])
    const [shufflArr,setShufflArr]=useState([]); 
    const [myAnsur,setMyAnsur]=useState([]);
  
    const [read,setRead]=useState(false);   
    // const {id}=useParams();

    useEffect(() => {
  if (next != id) return;

  const numericId = parseInt(id);
  const currentLesson = lessonData.filter(
    item => item.number == numericId && item.type == 'writeSentenceClick'
  );

  if (!currentLesson) return;

   setAnsur(currentLesson[0].text.split('***').map(sentence =>sentence.trim().split(' ')))


    setMyAnsur(Array(currentLesson[0].text.split('***').length).fill(''));
    setAsk(currentLesson[0].ask || '');

  if (lists.indexOf(numericId) == lists.length - 1) {
    setRead(false);
  } else {
    setRead(true);
  }
}, [next, lists]);
    useEffect(()=>{
    setShufflArr(shuffeldArray(ansur))
    },[ansur])
    const shuffeldArray=(arr)=>{
        const shuffeldArray = []
        for(let i=0 ; i<arr.length ; i++){
             const shuffeldArrayItem=arr[i].slice()
             for(let k=shuffeldArrayItem.length-1 ; k>0 ; k--){
                const j = Math.floor(Math.random()*(k+1));
                [shuffeldArrayItem[k], shuffeldArrayItem[j]] = [shuffeldArrayItem[j], shuffeldArrayItem[k]];
             }
             shuffeldArray.push(shuffeldArrayItem);
        }
        return shuffeldArray;
    }
    const handleSentence=(iow,ios)=>{
   if(next>id || mach) return;
    setMyAnsur(pre=>({ ...pre,
        [ios]:[...pre[ios],shufflArr[ios][iow]]}))
    setShufflArr(pre=>{
      const newArr=pre.map((item,index)=>{
            if(index==ios){
                return item.filter((_,ind)=>ind!=iow)
            }else{
                return item;
            }
        })
       if(newArr[ios].length==0){
           newArr[ios]='';
        }
        return newArr;
    });  
    }
    const handleBackSentence=(iow,ios)=>{
        if(next>id || mach) return;
        setShufflArr(pre=>{
            const newArr=pre.map((item,index)=>{
                if(index==ios){
                    return item[0]=='' ? [myAnsur[ios][iow]] : [...item,myAnsur[ios][iow]];
                }else{
                    return item;
                }
            })  
            return newArr;
        });
        setMyAnsur(pre=>({
            ...pre,
            [ios]:pre[ios].filter((_,ind)=>ind!=iow)
        }));

    }      
    const ansurStyle=(index)=>{
        if(!read){
            return 'bg-gray-400'
        }else{
           return myAnsur[index].join(' ')==ansur[index].join(' ') ? 'bg-green-700' : 'bg-red-700';
        }
    }
        const handlInput=()=>{

 const check = shufflArr.every(value => value == '' || value.length == 0) ;
 if(check){
    setShow(false)
    setMach(true)
    setRead(true)
 } else{
    setShow(true)
 }
  

      }
    const rrr=useCallback(()=>{
        return <div className='my-5'>
        <ul  className='space-y-5'>
           {shufflArr.map((item,index)=><li key={index}>
                       <div >{item!='' ?  item.map((ele,ind)=>ele!='' ? <span className='mx-2 bg-[var(--main-color)] px-1 py-0.5 rounded-[5px] text-white cursor-pointer' onClick={()=>handleSentence(ind,index)}>{ele}</span>:''):''}</div>
                        <div className=' border-b-1 border-dashed py-2  '>{myAnsur[index] !='' ? myAnsur[index].map((word,ind)=><span key={ind} className={` ${ansurStyle(index)} mx-2 rounded-[5px] px-1 py-0.5 text-white`} onClick={()=>handleBackSentence(ind,index)}>{word} </span>) : ''}</div>
                        {read && <span className={
                            read ? ' text-green-700':'hidden'}> ( {ansur[index].join(' ')} )</span>}   
                    </li>)}
        </ul>
        </div>
    },[ask,ansur,shufflArr,myAnsur,read,mach])

  return (
    // <Container className='ubung1 my-5'>
    <Container className={next==id ? 'block':'hidden'}>
         <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte ordnen Sie die Wörter zu! "/>
         {rrr()}
        <div>
       
            <button onClick={()=>handlInput()}   className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">
                 Korrigieren Sie
            </button>
       </div>
    </Container>
  )
}

export default WriteSentenceClick