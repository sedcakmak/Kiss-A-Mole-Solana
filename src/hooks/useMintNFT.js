// // hooks/useMintNFT.js

// import { useWallet } from "@solana/wallet-adapter-react";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import {
//   mintV2,
//   setComputeUnitLimit,
// } from "@metaplex-foundation/mpl-candy-machine";
// import { transactionBuilder, generateSigner } from "@metaplex-foundation/umi";
// import { Connection, clusterApiUrl } from "@solana/web3.js";

// export const useMintNFT = () => {
//   const wallet = useWallet();

//   // Create a connection to the Solana devnet
//   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

//   const mintNFT = async () => {
//     if (!wallet.connected) {
//       throw new Error("Wallet not connected");
//     }

//     const umi = createUmi(connection); // Create Umi instance with the connection
//     const nftMint = generateSigner(umi);

//     // Assuming you have the candy machine and collection details set up
//     const candyMachine = {
//       publicKey: "DWQJiJNsefZc1EZaZqamjYhBruDz62st1wqvazg7n1BP", // Your Candy Machine ID
//       tokenStandard: "NonFungible", // Adjust according to your setup
//     };

//     const collectionNft = {
//       publicKey: "D2G3HypsiK11WrBPkZX6ASJWCkaa4KfhaLM4Uuej8CtK", // Your Collection NFT public key
//       metadata: {
//         updateAuthority: "7p4zgJoTT2MoQfGX4G9Y59cpce15guPWYP9kCaLb1qni", // Your Collection Update Authority
//       },
//     };

//     await transactionBuilder()
//       .add(setComputeUnitLimit(umi, { units: 800_000 }))
//       .add(
//         mintV2(umi, {
//           candyMachine: candyMachine.publicKey,
//           nftMint,
//           collectionMint: collectionNft.publicKey,
//           collectionUpdateAuthority: collectionNft.metadata.updateAuthority,
//           tokenStandard: candyMachine.tokenStandard,
//         })
//       )
//       .sendAndConfirm(umi);

//     return nftMint.publicKey; // Return the minted NFT address
//   };

//   return mintNFT;
// };

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  mintFromCandyMachineV2,
  setComputeUnitLimit,
} from "@metaplex-foundation/mpl-candy-machine";
import { transactionBuilder, generateSigner } from "@metaplex-foundation/umi";

const useMintNFT = () => {
  const wallet = useWallet();

  if (!wallet.connected) {
    console.log("Wallet not connected");
    return null;
  }

  const umi = createUmi("https://api.devnet.solana.com");

  // Register Wallet Adapter to Umi
  umi.use(walletAdapterIdentity(wallet));

  const candyMachinePublicKey = "DWQJiJNsefZc1EZaZqamjYhBruDz62st1wqvazg7n1BP"; // Candy Machine ID
  const collectionMintPublicKey =
    "D2G3HypsiK11WrBPkZX6ASJWCkaa4KfhaLM4Uuej8CtK"; // Collection Mint Public Key
  const mintAuthority = "EFoSB8KpcZdYrWxPeKZtBBskMcrBJi5XiVyjsnqzzjyq"; // Mint Authority

  const mintNFT = async () => {
    try {
      const nftMint = generateSigner(umi); // Generate a signer for the NFT mint
      const nftOwner = wallet.publicKey; // Use the wallet's public key as the NFT owner

      // Prepare the minting transaction
      await transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 })) // Set compute unit limit
        .add(
          mintFromCandyMachineV2(umi, {
            candyMachine: candyMachinePublicKey, // Pass the candy machine public key
            mintAuthority: mintAuthority, // The authority to mint the NFT
            nftOwner, // The owner of the minted NFT
            nftMint, // The NFT mint address
            collectionMint: collectionMintPublicKey, // The collection mint address
            collectionUpdateAuthority: mintAuthority, // The collection update authority
          })
        )
        .sendAndConfirm(umi); // Send the transaction and wait for confirmation

      console.log("NFT Minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      throw error; // Propagate error for handling in your components
    }
  };

  return mintNFT;
};

export default useMintNFT;
