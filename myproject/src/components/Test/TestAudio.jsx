import React, { useContext, useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { AiFillAudio, AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { AiFillSound } from "react-icons/ai";

import { Context } from "../../Context/Context";

const TestAudio = ({ id }) => {
  const { dataTest, test_id ,resultTest,setResultTest} = useContext(Context);

  const [audioUrl, setAudioUrl] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);
const [showVolume, setShowVolume] = useState(false);
  useEffect(() => {
    const audioItem =
      dataTest?.find((e) => e.id == test_id)?.lesson_data?.find((e) => e.id == id);

    if (!audioItem) return;

    const srcValue = Array.isArray(audioItem.src)
      ? audioItem.src[0]
      : audioItem.src;

    // Extract URL from iframe code
    if (typeof srcValue === "string" && srcValue.includes("<iframe")) {
      const match = srcValue.match(/src="([^"]+)"/i);
      if (match) {
        const url = new URL(match[1]);
        const params = new URLSearchParams(url.search);

        setStart(parseInt(params.get("start") || 0));
        setEnd(parseInt(params.get("end") || 0));
        setAudioUrl(url.toString());
      }
    } else {
      setAudioUrl(srcValue);
    }
    setResultTest((prev)=>prev.includes(id)?prev:[...prev,id]); 
  }, [dataTest, id, test_id]);

  const handleProgress = (state) => {
    if (end && state.playedSeconds >= end) {
      setPlaying(false); // auto stop
    }
  };

  // UI Rendering
  const renderControls = useCallback(() => {
    if (!audioUrl) return null;

    return (
      <div  >
      
         <div className="flex justify-between items-center gap-3">
            <div>
            {!playing ? (
            <AiFillPlayCircle
              className="text-3xl text-[var(--main-color)] cursor-pointer"
              onClick={() => setPlaying(true)}
            />
          ) : (
            <AiFillPauseCircle
              className="text-3xl text-[var(--main-color)] cursor-pointer"
              onClick={() => setPlaying(false)}
            />
          )}

         </div>
    
      <div  className="flex justify-center content-center items-center">
        
{showVolume ? (
  <div className=" text-[var(--main-color)]  flex justify-center content-center items-center mx-3" >
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      onChange={(e) => setVolume(parseFloat(e.target.value))}
      style={{ width: "100%" }}
    />
  </div>
):''}
        <AiFillSound
        className="text-3xl text-[var(--main-color)] cursor-pointer"
        onClick={() => setShowVolume((prev) => !prev)}
      />


      </div>

         </div>


        {/* Audio Player (hidden) */}
        <ReactPlayer
          url={audioUrl}
          playing={playing}
          volume={volume}
          controls={false}
          width="0"
          height="0"
          onProgress={handleProgress}
          config={{
            youtube: {
              playerVars: {
                start,
                end,
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
      </div>
    );
  }, [audioUrl, playing, volume, start, end,showVolume]);

  return (
    <section >
      <div className="container text-center">
        {audioUrl ? renderControls() : "empty"}
      </div>
    </section>
  );
};

export default TestAudio;
