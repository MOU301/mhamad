import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';

const Timer = ({ total }) => {
  const [timer, setTimer] = useState(total);
  const {setTimerState,wieder}=useContext(Context);
useEffect(()=>{
  setTimer(total)
},[wieder])
  useEffect(() => {
    if (timer === 0){
      setTimerState(false);
      return}; // stop when finished

    const t = setInterval(() => {
      setTimer(e => e - 1); // correct update
    }, 1000);
   setTimerState(true);
    return () => clearInterval(t);
 
  }, [timer]); // IMPORTANT: include timer

  const TimerRender = useCallback(() => {
    return <span>{timer}</span>;
  }, [timer]);

  return (
    <div>
      {TimerRender()}
    </div>
  );
};

export default Timer;
