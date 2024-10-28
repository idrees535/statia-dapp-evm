import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers';

// Infura Sepolia URL from environment variable
const infuraUrl = process.env.REACT_APP_SEPOLIA_URL;

// Sepolia provider for read-only calls
export const getInfuraProvider = () => {
  if (!infuraUrl) throw new Error("Infura URL not set in environment variables.");
  return new JsonRpcProvider(infuraUrl);
};

// MetaMask connection for signed transactions
export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found.");
  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};

// Load contract with either Infura or MetaMask
export const loadContract = (address, abi, signer = null) => {
  const provider = signer ? signer : getInfuraProvider();
  return new Contract(address, abi, provider);
};
