import React, { useState ,useEffect, useCallback, useContext} from 'react'
import { MdOutlineKeyboardVoice,MdOutlineRecordVoiceOver } from "react-icons/md";
import { Context } from '../../Context/Context';
import Container from '../Elements/Container';
import { TbColumnInsertLeft } from 'react-icons/tb';
import Frag from '../Elements/Frag';

// const topics = {
//     vorstellen: [
      // { question: "Wie heißt du?", answer: "Ich heiße " ,feedback:"hallo ****"},
      // {question:"bist du verheiratet? ",answer:["Ja","Nein"]},
      // { question: "Wie alt bist du?", answer: "Ich bin " },
      // {question : "Woher kommst du ? ",answer:"Ich komme aus"}
      
//     ]};

const BotTest = ({id}) => {
//join with  my app
 const {show,next,setShow,mach,setMach,lessonData,spaning,old}=useContext(Context);
const [topics,setTopics]=useState(null);
const [ask,setAsk]=useState(null);
    useEffect(()=>{
          if(old){
          setRead(false);
        }
    },[])
useEffect(() => {
  if (next == id) {
    const currentLesson = lessonData.find(
      item => item.number ==id && item.type =='bot'
    );

    if (currentLesson) {
      setTopics(currentLesson.bot);
      setAsk(currentLesson.ask);
    }
  }

  setStart(false);
}, [next, lessonData]);

//  useEffect(() => {
//    if (next === id) {
//      const dataFilter = lessonData.filter(item => item.number === id && item.type === 'bot');
//      if (dataFilter[0]) {
//        setTopics(dataFilter[0].bot);
//        setAsk(dataFilter[0].ask);
//      }
//    }
//    setStart(false);
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, [next, id, lessonData]);
//edn the join 




    const [was,setWas]=useState(false);
    const [question,setQuestion]=useState('');
    const [start,setStart]=useState(false);
    const [counter,setCounter]=useState(0)
    const [isReady,setIsReady]=useState(false);
  
    const findDifference = useCallback((str1, str2) => {
      const arr1 = str1.split(' ');
      const arr2 = str2.split(' ');
      return arr1.filter(word => !arr2.includes(word));
    }, []);
    const handleCounter = useCallback(() => {
      if (topics && topics.length === counter + 1) {
        speakResponse('du bist firtig und gut gemacht ');
        setStart(false);
        setCounter(0);
        setWas(false);
        setIsReady(false);
        setMach(true);
      } else {
        setCounter(e => e + 1);
      }
    }, [topics, counter, setMach]);
    // const handlefeedback=(transcript,correctAnswer)=>{
    //   const yourAnsuer=transcript.slice(0,-1);
      
    //   let correctItem ='falsch';
    //   if(typeof correctAnswer=='object'){
    //       for(let i=0 ; i<correctAnswer.length; i++){
    //         if(correctAnswer[i].toLowerCase()==yourAnsuer.toLowerCase()){
    //           correctItem=correctAnswer[i];
    //           break;
    //         }
    //       }
    //     }else{
    //       correctItem=correctAnswer;
    //     }
  
    // const correct=yourAnsuer.toLowerCase().includes(correctItem.toLowerCase());
    //   if(correct){
    //     if(topics[counter]['feedback']!=null){
    //           const feedback1=findDifference(yourAnsuer,correctItem);
    //           const ff=topics[counter]["feedback"].replace("****",feedback1);
    //           speakResponse(ff);
    //         }
    //         handleCounter();
    //         setIsReady(false);
    //         setWas(false);
    //    }else{
    //     speakResponse("Leider falsch. Versuch es nochmal.");
    //      handleFalsch();
    //    }
    // }
    const handlefeedback = useCallback((transcript, correctAnswer) => {
      const yourAnswer = transcript.trim();
      let matchedCorrect = null;
      if (Array.isArray(correctAnswer)) {
        for (let i = 0; i < correctAnswer.length; i++) {
          if (yourAnswer.toLowerCase().includes(correctAnswer[i].toLowerCase())) {
            matchedCorrect = correctAnswer[i];
            break;
          }
        }
      } else {
        if (yourAnswer.toLowerCase().includes(correctAnswer.toLowerCase())) {
          matchedCorrect = correctAnswer;
        }
      }
      const isCorrect = matchedCorrect !== null;
      if (isCorrect) {
        if (topics && topics[counter]?.feedback) {
          const feedback1 = findDifference(yourAnswer, matchedCorrect);
          const feedbackMessage = topics[counter].feedback.replace("****", feedback1);
          speakResponse(feedbackMessage);
        }
        handleCounter();
        setIsReady(false);
        setWas(false);
      } else {
        speakResponse("Leider falsch. Versuch es nochmal.");
        handleFalsch();
      }
    }, [topics, counter, findDifference, handleCounter]);

    const handleAnswer = useCallback((transcript) => {
      if (topics && topics[counter]) {
        const correctAnswer = topics[counter].ansur;
        handlefeedback(transcript, correctAnswer);
      }
    }, [topics, counter, handlefeedback]);
    //chatgpt
    const startVoiceRecognition = useCallback(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("متصفحك لا يدعم التعرف على الصوت. استخدم Chrome.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "de-DE";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleAnswer(transcript);
      };
      recognition.onerror = (event) => {
        console.error("حدث خطأ:", event.error);
      };
      recognition.start();
    }, [handleAnswer]);
    //chatgpt
    // const startVoiceRecognition = () => {
      
    // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //   recognition.lang = "de-DE";
    //   recognition.onresult = (event) => {
    //     const transcript = event.results[0][0].transcript;
    //     console.log(transcript);
    //     handleAnswer(transcript); // Automatically check the answer after voice input
    //       recognition.start(); 
    //   };
    //   recognition.onerror = (event) => {
    //     handleNoVoice(); 
    //   };
    //   recognition.start();
    // }
    const handleNoVoice = useCallback(() => {
      handleFalsch();
    }, [handleFalsch]);
    const speakQuestion = useCallback((text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.onend = () => {
        setIsReady(true);
        setWas(true);
      };
      speechSynthesis.speak(utterance);
    }, []);
    const speakResponse = useCallback((text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    }, []);
    const handleFalsch = useCallback(() => {
      setWas(false);
      setIsReady(false);
      speakQuestion(question);
    }, [question, speakQuestion]);
    useEffect(() => {
      if (topics && topics[counter]) {
        const randomQuestion = topics[counter];
        setQuestion(randomQuestion.ask);
        if (start) {
          speakQuestion(randomQuestion.ask);
        } else {
          setWas(false);
          setIsReady(false);
        }
      }
    }, [start, counter, topics, speakQuestion]);
    const rrr = useCallback(() => (
      isReady ? (
        <div className='answer'>
          <MdOutlineKeyboardVoice className='text-white fs-3' />
        </div>
      ) : (
        <div className='ask'>
          <MdOutlineRecordVoiceOver className='text-white fs-3' />
        </div>
      )
    ), [isReady]);
    useEffect(() => {
      if (isReady) {
        handleClick();
      }
    }, [isReady, handleClick]);

    const handleClick = useCallback(() => {
      startVoiceRecognition();
    }, [startVoiceRecognition]);

  return (
    <Container className={next === id ? 'bot' : 'd-none'}>
      <Frag achtungStyle={show ? 'd-block' : 'd-none'} frag={ask} achtung="fill the field please ! " />
      <button className={`btn ${start ? 'btn-danger' : 'btn-success'}`} onClick={() => setStart(e => !e)}>{start ? 'stop' : 'start'}</button>
      <div className='h-100 d-flex justify-content-center align-items-center align-content-center'>
        {start ? rrr() : null}
      </div>
    </Container>
  );
}

export default BotTest
