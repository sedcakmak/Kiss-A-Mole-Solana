import React, { useRef, useEffect } from "react";
import { Howl } from "howler";
import enterSound from "../sounds/enter.wav";
import kissSound from "../sounds/kiss.mp3";

const enterSoundEffect = new Howl({
  src: [enterSound],
  volume: 0.5,
});

const kissSoundEffect = new Howl({
  src: [kissSound],
  volume: 0.5,
});

const Ground = ({ isMoleActive, count, setCount }) => {
  const moleRef = useRef(null);

  const randomFace = () => {
    const faces = ["rotateY(180deg)", "rotateY(0deg)"];
    if (moleRef.current) {
      moleRef.current.style.transform =
        faces[Math.floor(Math.random() * faces.length)];
    }
  };

  useEffect(() => {
    if (isMoleActive) {
      randomFace();
      enterSoundEffect.play();
    }
  }, [isMoleActive]);

  const handleMoleClick = () => {
    if (isMoleActive) {
      setCount(count + 1);
      kissSoundEffect.play();
    }
  };

  return (
    <div className={`ground ${isMoleActive ? "active" : ""}`}>
      <div className="wrapper">
        <div className="dirt"></div>
        <div
          className={`mole ${isMoleActive ? "active" : ""}`}
          ref={moleRef}
          onClick={handleMoleClick}
        ></div>
      </div>
    </div>
  );
};

export default Ground;
