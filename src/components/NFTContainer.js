import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ReactComponent as SombreroMole } from "../images/sombrero-mole.svg";
import { ReactComponent as CowboyMole } from "../images/cowboy-mole.svg";
import useMintNFT from "../hooks/useMintNFT";

const NFTContainer = () => {
  const { publicKey } = useWallet();
  const mintNFT = useMintNFT();

  const handleMint = async (nftType) => {
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const nft = await mintNFT();
      if (nft) {
        alert(`Successfully minted ${nftType} NFT!`);
        // Here you can add logic to update game state, show the NFT, etc.
      }
    } catch (error) {
      alert(`Failed to mint NFT: ${error.message}`);
    }
  };

  return (
    <div className="nft-container">
      <SombreroMole
        className="nft-image"
        onClick={() => handleMint("Sombrero")}
      />
      <CowboyMole
        className="nft-image"
        onClick={() => handleMint("Cowboy")}
      />
    </div>
  );
};

export default NFTContainer;
