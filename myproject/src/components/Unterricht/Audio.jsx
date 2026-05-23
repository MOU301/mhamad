
import React, { useContext, useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillSound,

} from "react-icons/ai";

import { Context } from "../../Context/Context";

const Audio = ({ id }) => {
  const {lessonData,next,setMach} = useContext(Context);

  const [audioUrl, setAudioUrl] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audioItem = lessonData.find(
      (item) => String(item.number) === String(id) && item.type === "audio"
    );

    if (!audioItem) return;


    const srcValue = Array.isArray(audioItem.src)
      ? audioItem.src[0]
      : audioItem.src;

    if (typeof srcValue === "string" && srcValue.includes("<iframe")) {
      const match = srcValue.match(/src="([^"]+)"/i);
      if (match) {
        const url = new URL(match[1]);
        const params = new URLSearchParams(url.search);
        setStart(+params.get("start") || 0);
        setEnd(+params.get("end") || 0);
        setAudioUrl(url.toString());
      }
    } else {
      setAudioUrl(srcValue);
    }
  }, [lessonData, id]);
  useEffect(() => {
      if (String(next) === String(id)) {
     
        setPlaying(true);
      } else {
      ;
        setPlaying(false);
      }
    }, [next, id]);

  const handleProgress = (state) => {
    if (end && state.playedSeconds >= end) {
      setPlaying(false);
      setMach(true)
    };
  };

const renderControls = useCallback(() => (
  <div className="flex justify-between items-center mx-4">

    {/* Play / Pause */}
    <div className="text-[var(--main-color)] opacity-70 hover:opacity-100 "> 
      {!playing ? (
        <AiFillPlayCircle
          className="text-3xl  cursor-pointer"
          onClick={() => setPlaying(true)}
        />
      ) : (
        <AiFillPauseCircle
          className="text-3xl  cursor-pointer"
          onClick={() => setPlaying(false)}
        />
      )}
    </div>

    {/* Volume Section */}
    <div className="flex items-center gap-2 relative">

      {showVolume && (
        <div className="w-[120px] h-[20px] flex items-center px-2 rounded-md bg-gray-100 ">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={e => setVolume(+e.target.value)}
            className="w-full cursor-pointer   bg-gray-300
             accent-[var(--main-color)]
             hover:accent-[var(--main-color)] opacity-80 "
          />
        </div>
      )}

      <AiFillSound
        className="text-2xl text-[--second-background] opacity-70 hover:opacity-100  cursor-pointer"
        onClick={() => setShowVolume(v => !v)}
      />

      <ReactPlayer
        url={audioUrl}
        playing={playing}
        volume={muted ? 0 : volume}
        width="0"
        height="0"
        onProgress={handleProgress}
        config={{ youtube: { playerVars: { start, end } } }}
      />
    </div>

  </div>
), [audioUrl, playing, volume, muted, showVolume, start, end]);

  return (
    <section className={String(next) == String(id) ? "block" : "hidden"}>
      {audioUrl ? renderControls() : "empty"}
    </section>
  );
};

export default Audio;


