import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
require("@solana/wallet-adapter-react-ui/styles.css");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
