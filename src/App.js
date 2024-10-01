import React, { useState, useEffect, useMemo } from "react";
import Timer from "./components/Timer";
import Score from "./components/Score";
import Board from "./components/Board";
import Modal from "./components/Modal";
import NFTContainer from "./components/NFTContainer";
// import ConnectWalletButton from "./components/ConnectWalletButton";

import "./App.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  clusterApiUrl,
  Transaction,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";

function App() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeUp, setTimeUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeUp(true);
      setShowModal(true);
    }
  }, [timeLeft]);

  const startGame = () => {
    setCount(0);
    setTimeLeft(30);
    setTimeUp(false);
    setShowModal(false);
    setGameStarted(true);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetGame = () => {
    setCount(0);
    setTimeLeft(30);
    setTimeUp(false);
    setShowModal(false);
    setGameStarted(false);
  };

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <div className="game-container">
              <div className="button-wrapper">
                <button
                  className="start-button"
                  onClick={startGame}
                >
                  Start Game
                </button>
              </div>
              <WalletMultiButton />
            </div>
            <div className="info-container">
              <Timer timeLeft={timeLeft} />
              <Score count={count} />
            </div>
            <div className="board">
              <Board
                count={count}
                setCount={setCount}
                timeUp={timeUp}
                gameStarted={gameStarted}
              />
              {showModal && (
                <Modal
                  count={count}
                  onClose={resetGame}
                />
              )}
            </div>
            <NFTContainer />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
