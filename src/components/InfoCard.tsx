import React, { useState, useEffect, useContext } from 'react'

import { ITimerContext } from '../../@types/todo';
import { TimerContext } from '../context/timerContext';

import "../styles/InfoCard.css"

const InfoCard:React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderTimeoutID, setLoaderTimeoutID] = useState<number>();
  
  const { infoCardOn, infoCardText, optionElementSelected, infoID, clickedAgain } = useContext(TimerContext) as ITimerContext
  
  
  useEffect(() => {
    timerReset();
  }, [optionElementSelected, infoID, infoCardText, clickedAgain === true]);
  
  const infoStyle = {
      left: infoCardOn ? "0px" : "-20rem"
  };

  const resetTimer= (timeoutTime: number, resetTime: number):void => {
    if (loader) {
      setLoader(false)
      const id = setTimeout(() => {
        setLoader(true);
      }, resetTime);
      setLoaderTimeoutID(id);
    } else {
    setLoader(true);
    const id = setTimeout(() => {
      setLoader(false);
    }, timeoutTime);
    setLoaderTimeoutID(id);
    }
  };

  const timerReset = () => {
    if (loaderTimeoutID) {
      clearTimeout(loaderTimeoutID);
    }
    resetTimer(1150, 50);
  };

  return (
    <>
      <div style={infoStyle} className={"infoCard"}>
          {infoCardText}
          {
            loader === true && 
            <div className={"load-bar"}></div>
          }
      </div>
    </>
  )
}

export default InfoCard
