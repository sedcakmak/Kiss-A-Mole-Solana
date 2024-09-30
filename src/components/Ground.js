import React, { useRef, useEffect } from "react";

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
    }
  }, [isMoleActive]);

  const handleMoleClick = () => {
    if (isMoleActive) {
      setCount(count + 1);
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
