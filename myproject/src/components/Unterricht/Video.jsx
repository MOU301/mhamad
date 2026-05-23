
// import React, { Component, useCallback, useContext, useEffect, useRef, useState } from 'react'
// import { Context } from '../../Context/Context';
// import ReactPlayer from 'react-player'
// import { RxVideo } from "react-icons/rx";


// const Video = ({id}) => {

//     const {next,setMach,lessonData}=useContext(Context);
//     const [path,setPath]=useState([]);
//     const [run,setRun]=useState(false);
//     const [time,setTime]=useState(null);
//     useEffect(()=>{
      
//    setPath(lessonData.filter(item=>(item.number==id && item.type=='video'))[0].src);
 
//   },[]);
//   useEffect(()=>{
//     if(path[0]!=null){
//       if(path[0].includes('<iframe')){
//       const match = path[0].match(/src="([^"]+)"/i);
//         if (match) {
//           const url = new URL(match[1]); // https://www.youtube-nocookie.com/embed/...

//           const params = new URLSearchParams(url.search);

//           const start = params.get("start"); // "17"
//           const end   = params.get("end");   // "200"
 
//           setTime((end-start)*1000);
// }
//     }
//     }
//   },[path])
//   const handlRun=()=>{
//     setRun(true);
//   }
//   useEffect(() => {
//   let timer;
//   if (run) {
//     // بعد 3 ثواني يرجع run=false
//     timer = setTimeout(() => {
//       setRun(false);
//       setMach(true)
//     }, time);
//   }

//   return () => clearTimeout(timer); // تنظيف التايمر
// }, [run]);
//   const rr=useCallback(()=>{
//     return  run ? <div className='video-wrapper' dangerouslySetInnerHTML={{ __html:path[0]}}/>:<div className='no-video' ><RxVideo className='fs-1 text-danger' onClick={()=>handlRun()}/></div>
//   },[run])



//   return path.length> 0 ? (
//     <>
  
//     <section  className={next==id ? 'video':'d-none'}>
        
//         {path[0].includes('<iframe') ? rr() :
//          <ReactPlayer playing={next==id ? true:false} muted onEnded={()=>setMach(true)}  controls={true} url={path}  />   }

//     </section>
//     </>

    
   

//   ):''
// }

// export default Video
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { Context } from "../../Context/Context";


const Video = ({ id }) => {
  const { next, setMach, lessonData } = useContext(Context);

  const playerRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(null);
  const [run, setRun] = useState(false);
  const [playing, setPlaying] = useState(false);

  // 🔹 Load video info from lessonData
  useEffect(() => {
    const videoItem = lessonData.find(
      (item) => String(item.number) === String(id) && item.type === "video"
    );

    if (!videoItem) return;

    const srcValue = Array.isArray(videoItem.src) ? videoItem.src[0] : videoItem.src;

    if (typeof srcValue === "string" && srcValue.includes("<iframe")) {
      const match = srcValue.match(/src="([^"]+)"/i);
      if (match) {
        const url = new URL(match[1]);
        const params = new URLSearchParams(url.search);

        const startTime = parseInt(params.get("start") || 0);
        const endTime = parseInt(params.get("end") || 0);
        const videoId = url.pathname.split("/").pop();

        setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
        setStart(startTime);
        setEnd(endTime);
      }
    } else  {
      setVideoUrl(srcValue);
    }
  }, [id, lessonData]);

  // 🔹 Activate when lesson step is current 
  useEffect(() => {
    if (String(next) === String(id)) {
      setRun(true);
      setPlaying(true);
    } else {
      setRun(false);
      setPlaying(false);
    }
  }, [next, id]);

  // 🔹 Stop video automatically when end time is reached
  const handleProgress = (state) => {
    if (end && state.playedSeconds >= end) {
      setPlaying(false);
      setMach(true); // mark this step as done
    }
  };
const rrr=useCallback(()=>{

  return <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={playing}
            controls
            onEnded={() => setMach(true)}
            onProgress={handleProgress}
            
            config={{
              file: {
                forceVideo: true,
                attributes: {
                  preload: "metadata",
                  controlsList: "nodownload",
                },
              },
            }}  
          />

        
     
},[playing,videoUrl])
  return (
    <section className={String(next) === String(id) ? "block" : "hidden"}>
      <div className="flex flex-row justify-center ">
          {videoUrl ? rrr():'no video available'}
      </div>
    </section>
  );
};

export default Video;


