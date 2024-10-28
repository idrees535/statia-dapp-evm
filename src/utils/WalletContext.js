import React, { createContext, useContext, useState } from 'react';
import { connectWallet } from './ethereum'; // Adjust path to where connectWallet is defined

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnectWallet = async () => {
    try {
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, handleConnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
