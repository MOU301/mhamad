
import  { useEffect,useState,useCallback,useContext } from 'react'
import { useParams } from 'react-router';

import Container from '../Elements/Container';
import { Context } from '../../Context/Context';
import Frag from '../Elements/Frag';
import { use } from 'react';
// const lessonData=[
//          {
//               'number':1,
//              'ask':'Füllen Sie die Lücken mit den richtigen Wörtern aus.',
//               "type":"fillTextClick",
//               "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//              "ansur":['one','two','three','four','five','six','seven','eight','nine','ten']
//          }
//  ]
const Ubung1Click = ({id}) => {
        const [text,setText]=useState('');
        const [ansur,setAnsur]=useState([]);
        const [shufflArr,setShufflArr]=useState([]);
        const [ask,setAsk]=useState(null);
        const [myAnsur,setMyansur]=useState({});
        const [clickAnsur,setClickAnsur]=useState(null);
        const [clickFill,setClickFill]=useState(null);
        const [read,setRead]=useState(false);
        const {show,next,setShow,mach,setMach,spaning,lists,lessonData}=useContext(Context);
        // const {id}=useParams();
     
    const shuffleArray = (arr) => {
        const shuffeldArray = arr.slice();
        for (let i = shuffeldArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffeldArray[i], shuffeldArray[j]] = [shuffeldArray[j], shuffeldArray[i]];
        }
        return shuffeldArray;
    }
        useEffect(() => {
        
          if (next != id) return;
        
          const numericId = parseInt(id);
          const currentLesson = lessonData.find(
            item => item.number == numericId && item.type == 'fillTextClick'
          );
        
          if (!currentLesson) return;
        
          setAsk(currentLesson.ask || '');
          setAnsur(currentLesson.ansur || []);
          setText(currentLesson.text || '');
        
          const lastIndex = lists.length - 1;
          const currentIndex = lists.indexOf(numericId);
          setRead(currentIndex < lastIndex);
        
        }, [next, lists, lessonData, myAnsur]);
        useEffect(() => {
            setShufflArr(shuffleArray(ansur));
           },[ansur]);
       const handleClickAnsur=(index)=>{
         if(next>id || mach) return;
          setClickAnsur(index)
       }
       const handleClickFill=(index)=>{
       if(next>id || mach) return;
          setClickFill(index)
       
       }
       useEffect(()=>{
          if(clickAnsur!=null&&clickFill!=null){
 
           setMyansur(pre=>({
            ...pre,
            [clickFill]:clickAnsur
           }))
           setClickAnsur(null);
           setClickFill(null);
         }
          
       },[clickAnsur,clickFill])
       const correct=(index)=>{
        const indexOfindex = Object.keys(myAnsur).map(Number).indexOf(Math.round(index/2)-1);
        return ansur[indexOfindex];
       }
const parseText = (text) => {
   const parts = text.split(/(\*\*\*|\/\/)/);

    return parts.map((part, index) => {
      if (part === "***") {
        return <span key={index}>
                {/* <input className='text-primary fill2'  */}
                       <span >
                        <button className={` ${styleAnsur(Math.round(index/2)-1)}  mx-2`} onClick={()=>handleClickFill(Math.round(index/2)-1)}>
                            { myAnsur[Math.round(index/2)-1]!== undefined ? shufflArr[myAnsur[Math.round(index/2)-1]] : `______`}
                        </button>
                       </span>

                        <span className={read ? ' text-green-800':'hidden'}>
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
 
       const styleClickAnsur=(index)=>{
         if(clickAnsur==index){
            return ' bg-gray-800';
         }else{
             if(Object.values(myAnsur).includes(index)){
               return 'bg-gray-500'
             }else{
               return 'bg-[var(--main-color)]'
             }
         }
        }
    
    const handlInput=()=>{

     const myAnsurArr= Object.keys(myAnsur)
              .map(Number)
              .sort((a, b) => a - b)
            
          if(!read){
             if(ansur.length==myAnsurArr.length){
                  setShow(false)
                  setMach(true)
                  setRead(true)           
                }else{
                 setShow(true)
                }
            }

      }
      const styleAnsur = (index) => {
    // Get sorted values of myAnsur by numeric key order
  const indexOfindex = Object.keys(myAnsur).map(Number).indexOf(index);

    if (read) {
      if (shufflArr[myAnsur[index]] === ansur[indexOfindex]) {
        return 'text-green-700'; // 
      } else { 
        return 'text-red-700'; //
      }
    } else {
      if(clickFill==index){
        return  "border-[var(--main-color)] text-[var(--main-color)]"
      }else{
         return 'border-gray-700 text-[var(--main-color)]'; //
      }
      
    }
  };
        const rrr = useCallback(() => {
          return <>
          {shufflArr.map((item,index)=>(
            <button key={index} className={`py-0.5 opacity-90 rounded-xl  px-1 ${styleClickAnsur(index)}  text-white mx-1 mb-4`} onClick={()=>handleClickAnsur(index)}>{item}</button>
          ))}
          { text ? <p className='px-1'>{parseText(text)}</p> : null}
          
          </>
          //  return text ? <p className='px-1'>{text}</p> : null;
        }, [shufflArr, text,myAnsur,clickAnsur,clickFill,read]);
  return text.length>0 ? (
    <Container className={next==id ? 'block':'hidden'}>
     {/* <Container className='ubung1' > */}
       <Frag achtungStyle={show ? 'block':'hidden'} frag={ask} achtung="Bitte füllen Sie die Felder aus! "/>   
           {rrr()}
           <div className='mt-5'>
                  <button onClick={()=>handlInput()} 
                          className="bg-[var(--second-background)] opacity-85 hover:opacity-100 text-[var(--main-background)] font-serif py-1 px-2 rounded-xl">
                              Korrigieren Sie
                  </button>
            </div>
        
    </Container>
  ) : '';
}

export default Ubung1Click