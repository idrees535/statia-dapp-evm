import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import LMSRPredictionMarketABI from '../../../contracts/LMSRPredictionMarket.json';
import ERC20ABI from '../../../contracts/ERC20Token.json';
import "./BuySell.css";
import { useWallet } from '../../../utils/WalletContext';
import { useParams, useLocation } from 'react-router-dom';

function BuySell() {
  const [activeTab, setActiveTab] = useState('Buy');
  const [selectedOutcome, setSelectedOutcome] = useState('Yes');
  const [amount, setAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [title, setTitle] = useState('');
  const location = useLocation();


  const [error, setError] = useState('');
  const [priceYes, setPriceYes] = useState("0.00");
  const [priceNo, setPriceNo] = useState("0.00");
  const { walletAddress, handleConnectWallet } = useWallet();
  const query = new URLSearchParams(location.search);

  const address = query.get('address') 
  const MARKET_ADDRESS = address;
  const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;



  // Retrieve query parameters
  

  useEffect(() => {
    loadContracts();
  }, []); 

  const getMarketPrices = async () =>{
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    // Instantiate the market contract
    const marketContract = new Contract(address, LMSRPredictionMarketABI, signer);
    // Fetch the title and marketDuration
    const title = await marketContract.title();
    setTitle(title);

    const price_yes = ethers.parseUnits((await marketContract.getPrice(0)).toString(), 8);
    const price_no = ethers.parseUnits((await marketContract.getPrice(1)).toString(), 8);
    setPriceYes(formatUnits(price_yes));
    setPriceNo(formatUnits(price_no));

    // const price_0 = await marketContract.getPrice(0);
    // const price_1 = await marketContract.getPrice(1);
    // const formattedPriceYes = formatUnits(price_0, 10);
    // const formattedPriceNo = formatUnits(price_1, 10);
    
    // setPriceYes(formattedPriceYes);
    // setPriceNo(formattedPriceNo);
    
    // console.log('Price Yes:', formattedPriceYes);
    // console.log('Price No:', formattedPriceNo);
  }
  useEffect(() => {
    getMarketPrices();
  }, [address]); 

  const loadContracts = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const marketContract = new Contract(MARKET_ADDRESS, LMSRPredictionMarketABI, signer);
    const tokenContract = new Contract(TOKEN_ADDRESS, ERC20ABI, signer);
    // const price_yes = ethers.parseUnits((await marketContract.getPrice(0)).toString(), 8);
    // const price_no = ethers.parseUnits((await marketContract.getPrice(1)).toString(), 8);
    // setPriceYes(formatUnits(price_yes));
    // setPriceNo(formatUnits(price_no));

    return { marketContract, tokenContract };
  };

  const handleBet = async () => {
    try {
      const { marketContract, tokenContract } = await loadContracts();
      const outcomeIndex = selectedOutcome === 'Yes' ? 0 : 1;


      // const netCost = await marketContract.estimateCost(outcomeIndex, amount);
      // console.log('netCost',formatUnits(netCost,18))
      // setNetAmount(formatUnits(netCost));
      // const approveTx = await tokenContract.approve(MARKET_ADDRESS, netCost);
      // await approveTx.wait();
      // const tx = await marketContract.buyShares(outcomeIndex, amount);
      // await tx.wait();

      // Estimate cost if buying, or fetch the user's share amount if selling
    let netCost;
    if (activeTab === 'Buy') {
      netCost = await marketContract.estimateCost(outcomeIndex, amount);
      setNetAmount(formatUnits(netCost, 18));

      // Approve the transaction
      const approveTx = await tokenContract.approve(MARKET_ADDRESS, netCost);
      await approveTx.wait();

      // Buy shares
      const tx = await marketContract.buyShares(outcomeIndex, amount);
      await tx.wait();
      console.log("Shares bought successfully!");
    } 
    else {
      // If selling, no need for approval (assuming you're receiving payment)
      netCost = await marketContract.sellShares(outcomeIndex, amount);
      setNetAmount(formatUnits(netCost, 18));

      // Sell shares
      const tx = await marketContract.sellShares(outcomeIndex, amount);
      await tx.wait();
      console.log("Shares sold successfully!");
    }

  }
    catch (error) {
      setError("Number of shares must be greater than 0");
    }
  };

  const handleAmountChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setAmount(value);
  };
  return (
    <div>

      {/* Add your trading logic here */}

      <div className="home-containerLogin">
        <span className='trade'>{title}</span>

        <div className="tabsLogin">
          <button
            className={`tab-buttonLogin ${activeTab === 'Buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('Buy')}
          >
            Buy
          </button>
          <button
            className={`tab-buttonLogin ${activeTab === 'Sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('Sell')}
          >
            Sell
          </button>
        </div>


        <div className="outcome-sectionLogin">
          <div className="outcome-headerLogin">
            <span>Outcome</span>
          </div>
          <div className="outcome-optionsLogin">
            <button
              className={`outcome-buttonLogin ${selectedOutcome === 'Yes' ? 'selected' : ''}`}
              onClick={() => setSelectedOutcome('Yes')}
            >
              Yes {priceYes?? '0.00'}$
            </button>
            <button
              className={`outcome-buttonLogin ${selectedOutcome === 'No' ? 'selected-no' : ''}`}
              onClick={() => setSelectedOutcome('No')}
            >
              No {priceNo ?? '0.00'}$
            </button>
          </div>
        </div>

        <div className="amount-sectionLogin">
          <span>Shares</span>
          <div className="amount-buttonsLogin">
            <button className="amount-buttonLogin" onClick={() => setAmount(Math.max(0, amount - 1))}>-</button>
            <input
              type="number"
              className="amount-inputLogin"
              value={amount}
              onChange={handleAmountChange}
            />
            <button className="amount-buttonLogin" onClick={() => setAmount(amount + 1)}>+</button>
          </div>
        </div>

        {error && <div className="error-messageLogin">{error}</div>}

        {walletAddress ? (
          <button className="login-buttonLogin" onClick={handleBet}>
            {activeTab === 'Sell' ? 'Sell' : 'Buy'}
          </button>
        ) : (
          <button className="login-buttonLogin" onClick={handleConnectWallet}>Connect Wallet</button>
        )}

        <div className="info-sectionLogin">
          {activeTab === 'Buy' ? (
            <>
              <p>Avg price: <span className="blue-value">{selectedOutcome === 'Yes' ? priceYes ?? "0" : priceNo ?? "0"}$</span></p>
              <p>Estimated Amount: {netAmount ?? "0"}$</p>
              <p>Potential Return: <span className="green-value">${amount} ({((amount - netAmount) / netAmount) * 100}%)</span></p>
            </>
          ) : (
            <>
              <p>Avg price: <span className="blue-value">{selectedOutcome === 'Yes' ? priceYes : priceNo}¢</span></p>
              <p>Est. amount received: <span className="green-value">$2.73</span></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuySell;
