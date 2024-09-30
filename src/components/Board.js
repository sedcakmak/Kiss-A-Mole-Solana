import React, { useState, useEffect, useRef } from "react";
import Ground from "./Ground";

const Board = ({ count, setCount, timeUp, gameStarted }) => {
  const [activeMole, setActiveMole] = useState(null);
  const grounds = Array(8).fill(false);
  const peepInterval = useRef(null);

  const randomTime = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

  const randomGround = () => Math.floor(Math.random() * grounds.length);

  const peep = () => {
    if (timeUp) {
      clearInterval(peepInterval.current);
      setActiveMole(null);

      return;
    }

    const time = randomTime(400, 1200);
    const randomIndex = randomGround();
    setActiveMole(randomIndex);

    peepInterval.current = setTimeout(() => {
      setActiveMole(null);
      if (!timeUp) peep();
    }, time);
  };

  useEffect(() => {
    if (gameStarted) {
      peep();
    }

    return () => {
      clearTimeout(peepInterval.current);
      setActiveMole(null);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (timeUp) {
      clearTimeout(peepInterval.current);
      setActiveMole(null);
    }
  }, [timeUp]);

  return (
    <div id="play-area">
      {grounds.map((_, index) => (
        <Ground
          key={index}
          isMoleActive={index === activeMole}
          count={count}
          setCount={setCount}
        />
      ))}
    </div>
  );
};

export default Board;
