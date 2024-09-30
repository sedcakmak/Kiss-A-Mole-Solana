import React from "react";

const ConnectWalletButton = () => {
  const connectWallet = () => {
    // Wallet connection logic here
  };

  return (
    <button
      id="wallet-btn"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
