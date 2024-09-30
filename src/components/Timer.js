import React from "react";
import { ReactComponent as TimerImage } from "../images/timer.svg";

const Timer = ({ timeLeft }) => {
  return (
    <div className="timer">
      <TimerImage className="svg-info" />
      Timer: <span> {timeLeft}</span>
    </div>
  );
};

export default Timer;
