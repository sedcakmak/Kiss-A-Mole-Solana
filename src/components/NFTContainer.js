import React from "react";
import { ReactComponent as SombreroMole } from "../images/sombrero-mole-3.svg";
import { ReactComponent as CowboyMole } from "../images/cowboy-mole.svg";

const NFTContainer = () => {
  return (
    <div className="nft-container">
      <SombreroMole className="nft-image" />
      <CowboyMole className="nft-image" />
    </div>
  );
};

export default NFTContainer;
