import React from "react";
import { ReactComponent as ScoreImage } from "../images/kiss.svg";

const Score = ({ count }) => {
  return (
    <div className="score">
      <ScoreImage className="svg-info" />
      <h2>Score: {count}</h2>
    </div>
  );
};

export default Score;
