import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlayArea from "./PlayArea";
import Modal from "./Modal";
import ConnectWalletButton from "./ConnectWalletButton";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
