import{ useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { AiFillAudio } from "react-icons/ai";
import Frag from "../Elements/Frag";
import { Context } from "../../Context/Context";

const Audio = ({ id }) => {
  const { next, lessonData, show, setMach } = useContext(Context);

  const [audioUrl, setAudioUrl] = useState("");
  const [ask, setAsk] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(null);
  const [run, setRun] = useState(false);

  // 🔹 Load audio data only once
  useEffect(() => {
    const audioItem = lessonData.find(
      (item) => String(item.number) === String(id) && item.type === "audio"
    );
    if (!audioItem) return;

    setAsk(audioItem.ask);

    const srcValue = Array.isArray(audioItem.src)
      ? audioItem.src[0]
      : audioItem.src;

    if (typeof srcValue === "string" && srcValue.includes("<iframe")) {
      const match = srcValue.match(/src="([^"]+)"/i);
      if (match) {
        const url = new URL(match[1]);
        const params = new URLSearchParams(url.search);

        const startTime = parseInt(params.get("start") || 0);
        const endTime = parseInt(params.get("end") || 0);

        const audioLink = match[1];
        setAudioUrl(audioLink);
        setStart(startTime);
        setEnd(endTime);
      }
    } else if (typeof srcValue === "string") {
      setAudioUrl(srcValue);
    }
  }, [id, lessonData]);

  // 🔹 Automatically start when this step is active
  useEffect(() => {
    if (String(next) === String(id)) {
      setRun(true);
    } else {
      setRun(false);
    }
  }, [next, id]);

  // 🔹 Handle progress: stop automatically at `end`
  const handleProgress = (state) => {
    if (end && state.playedSeconds >= end) {
      setRun(false);
      setMach(true);
    }
  };

  return audioUrl ? (
    <section className={String(next) === String(id) ? "audio" : "d-none"}>
      <div className="container text-center">
        <Frag
          achtungStyle={show ? "d-block" : "d-none"}
          frag={ask}
          achtung="fill the field please !"
        />

        {audioUrl.includes("<iframe") ? (
          // 🎧 Embedded audio (like YouTube)
          <>
            {!run ? (
              <AiFillAudio
                className="fs-3 text-dark cursor-pointer"
                onClick={() => setRun(true)}
              />
            ) : (
              <div style={{ width: 0, height: 0, overflow: "hidden" }}
                   dangerouslySetInnerHTML={{ __html: audioUrl }} />
            )}
          </>
        ) : (
          // 🎧 Direct audio (mp3 or YouTube)
          <ReactPlayer
            url={audioUrl}
            playing={run}
            controls={false}         // no manual control
            width="0"
            height="0"
            onProgress={handleProgress}
            onEnded={() => setMach(true)}
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
        )}
      </div>
    </section>
  ) : null;
};

export default Audio;
