import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { metaplex } from "./metaplexClient"; // Metaplex setup'ınıza göre ayarlayın
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const BuyNFTButtons = () => {
  const { publicKey, sendTransaction } = useWallet(); // Cüzdanın public key'ini erişim
  const { connection } = useConnection();

  // NFT minting fonksiyonu
  const handleMintNFT = async (candyMachineId) => {
    try {
      const mint = await metaplex.candyMachines().mint({
        candyMachine: candyMachineId,
        owner: publicKey, // Minting için publicKey kullan
      });
      console.log(
        `Minting successful! NFT address: ${mint.mintAddress.toString()}`
      );
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };

  // NFT 1 için satın alma ve minting işlemi
  const handleBuyNFT1 = async () => {
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const recipientPubKey = new PublicKey("recipient-address-1"); // Alıcının adresi

      const transaction = new Transaction();
      const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: publicKey, // Bağlı cüzdanın public key'ini kullan
        toPubkey: recipientPubKey,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      });

      transaction.add(sendSolInstruction);

      // İşlemi gönder
      const signature = await sendTransaction(transaction, connection);
      console.log(`Transaction signature for NFT 1: ${signature}`);

      // Başarılı işlemden sonra NFT'yi mintle
      await handleMintNFT("candy-machine-id-for-nft1");
    } catch (error) {
      console.error("Transaction for NFT 1 failed", error);
    }
  };

  return (
    <div>
      <button onClick={handleBuyNFT1}>Buy NFT 1</button>
      {/* Diğer NFT'ler için benzer butonlar ekleyebilirsiniz */}
    </div>
  );
};

export default BuyNFTButtons;
