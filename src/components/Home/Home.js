import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CreateMarketForm from './CreateMarketForm/CreateMarketForm';
import './Home.css';
import MarketFactoryABI from '../../contracts/MarketFactory.json';
import LMSRPredictionMarketABI from '../../contracts/LMSRPredictionMarket.json';
import { textChangeRangeIsUnchanged } from 'typescript';

function NodesTab() {
  return <p></p>;
}

function InfrastructureTab() {
  return <p></p>;
}

function AIServicesTab() {
  return <p></p>;
}

function OraclesTab() {
  return <p></p>;
}

function Home() {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitResolution, setIsSubmitResolution] = useState(false);
  const [detailedMarkets, setDetailedMarkets] = useState([]);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedMarketAddress, setSelectedMarketAddress] = useState(null); // New state
  const [claimPayout, setClaimPayout] = useState(null); // New state
  //console.log("claimPayout", claimPayout)
  //console.log("selectedMarketAddressof claim", selectedMarketAddress)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCardClick = (address) => {
    navigate(`/trade?address=${address}`);
  };


  const handleSubmit = async () => {
    if (selectedOption !== null && selectedMarketAddress !== null) {
      try {
        // Initialize provider and signer
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        console.log('User:', (await signer).getAddress());
        console.log('selectedMarketAddress', selectedMarketAddress)
    
        // Instantiate the market contract
        const marketContract = new Contract(selectedMarketAddress, LMSRPredictionMarketABI, signer);

        // Set the outcome based on selectedOption
        // Assuming 'setOutcome' is a function in your smart contract that takes a uint8 argument
        console.log('Market: ', marketContract.address);
        console.log('Option: ', selectedOption);

        const tx_close = await marketContract.closeMarket();
        await tx_close.wait();  // Wait for the transaction to be mined

        console.log("Market closed successfully.");

        const tx = await marketContract.setOutcome(selectedOption);
        await tx.wait(); // Wait for the transaction to be mined
        console.log(textChangeRangeIsUnchanged)

        console.log(`Resolution Outcome set to: ${selectedOption === 1 ? 'Yes' : 'No'}`);

        // Optionally, refresh the markets or provide user feedback
        getActiveMarkets(); // Refresh the market list if necessary
        alert(`Resolution Outcome set to: ${selectedOption === 1 ? 'Yes' : 'No'}`);
      } catch (error) {
        console.error("Error setting outcome:", error);
        alert("There was an error setting the resolution outcome. Please try again.");
      } finally {
        // Reset the dialog and selection
        setIsSubmitResolution(false);
        setSelectedOption(null);
        setSelectedMarketAddress(null);
      }
    } else {
      alert("Please select an option before submitting.");
    }
  };

  const handleClaimPayout = async () => {
    if (!selectedMarketAddress) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const market = new Contract(selectedMarketAddress, LMSRPredictionMarketABI, signer);

      await market.claimPayout();
      console.log("Payout claimed for:", selectedMarketAddress);
      alert("Payout claimed successfully!");
      setSelectedMarketAddress(null); // Reset state after claiming
    } catch (error) {
      console.error("Error claiming payout:", error);
      alert("Error claiming payout.");
    }
  };
  function AllTab({ detailedMarkets }) {

    // State to track time left for each market
    const [timeLeft, setTimeLeft] = useState({});

    // Function to calculate time left for each market
    const calculateTimeLeft = (targetDate) => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      if (timeDifference <= 0) {
        return "Market has ended";
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Update the countdown every second
    useEffect(() => {
      const interval = setInterval(() => {
        const newTimeLeft = {};

        detailedMarkets.forEach((market) => {
          const targetDate = new Date(market.marketDuration * 1000);
          newTimeLeft[market.address] = calculateTimeLeft(targetDate);
        });

        setTimeLeft(newTimeLeft);
      }, 1000);

      return () => clearInterval(interval);
    }, [detailedMarkets]);

    //end

    if (detailedMarkets.length === 0) {
      return <p className='empty-state'>Loading Markets...</p>;
    }

    return (
      <div>
        <h2 className="home-section-title">Infrastructure</h2>
        <div className="home-featured-list">
          {detailedMarkets?.map((market, index) => (

            //start
            <div
              key={index}
              className="home-card"
              onClick={() => handleCardClick(market.address)}
            >
              <div className="home-card-header">
                <span className="home-category">{market.title}</span>
                <span className="home-days-left">
                  {timeLeft[market.address] || 'Calculating...'}
                </span>
              </div>
              {/* Odds and New Buttons Wrapper */}
              <div className="odds-and-actions">

                <div>
                  <p className="home-odds">
                    Indicative odds:
                    {market.prices.map((price, idx) => (
                      <button
                        key={idx}
                        className={`odds-button ${idx === 0 ? 'yes-button' : 'no-button'}`}
                      >
                        {idx === 0 ? 'Yes' : 'No'}: {(price * 100).toFixed(2)}%
                      </button>
                    ))}
                  </p>
                </div>

                <div className='new-buttons'>
                  <button className='submit-buttons' onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMarketAddress(market.address);
                    setIsSubmitResolution(true)
                  }}>Submit Resolution</button>
                  <button className='claim'
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMarketAddress(market.address);
                      setClaimPayout(true);
                      handleClaimPayout();
                    }}
                  >Claim</button>
                </div>

              </div>
            </div>


          ))}
        </div>
      </div>
    );
  }



  const getActiveMarkets = async () => {
    try {
      const factoryAddress = process.env.REACT_APP_FACTORY_ADDRESS;
      if (!factoryAddress) {
        console.error("Factory address is not defined in environment variables.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const factory = new Contract(factoryAddress, MarketFactoryABI, signer);
      console.log("Factory Address:", await factory.getAddress());
      // Fetch active markets
      console.log("Fetching active markets...");
      const markets = await factory.getActiveMarkets();
      console.log("Active Markets:", markets);
      const marketDetailsPromises = markets.map(address => fetchMarketDetails(address, signer));
      const marketDetails = await Promise.all(marketDetailsPromises);

      // Filter out any null responses due to errors
      const validMarketDetails = marketDetails.filter(detail => detail !== null);

      console.log("Detailed Markets:", validMarketDetails);

      setDetailedMarkets(validMarketDetails);
    } catch (error) {
      console.error("Error fetching active markets:", error);
    }
  };


  const fetchMarketDetails = async (marketAddress, signer) => {
    try {
      // Instantiate the market contract
      const marketContract = new Contract(marketAddress, LMSRPredictionMarketABI, signer);
      // Fetch the title and marketDuration
      const title = await marketContract.title();
      const marketDuration = await marketContract.marketEndTime();
      // Assuming you know the number of outcomes. Replace 2 with the actual number if different.
      const outcomeCount = 2;
      const prices = [];

      for (let i = 0; i < outcomeCount; i++) {
        const price = await marketContract.getPrice(i);
        // Convert price to a human-readable format if necessary
        prices.push(formatUnits(price, 10)); // Adjust decimals based on your implementation
      }

      return {
        address: marketAddress,
        title,
        marketDuration: parseInt(marketDuration, 10), // Convert from BigNumber to integer
        prices,
      };
    } catch (error) {
      console.error(`Error fetching details for market ${marketAddress}:`, error);
      return null;
    }
  };

  useEffect(() => {
    getActiveMarkets();
  }, []);

  const tabs = ['All', 'Nodes', 'Infrastructure', 'AI Services', 'Oracles'];
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Nodes':
        return <NodesTab />;
      case 'Infrastructure':
        return <InfrastructureTab />;
      case 'AI Services':
        return <AIServicesTab />;
      case 'Oracles':
        return <OraclesTab />;
      default:
        return <AllTab detailedMarkets={detailedMarkets} />;
    }
  };

  return (
    <div className="home-containerhaha">
      {/* Add Market Button */}
      <button className="add-market-btn" onClick={openModal}>
        <FaPlus className="add-icon" /> Create New Market
      </button>

      {/* Modal for CreateMarketForm */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>X</button>
            <CreateMarketForm />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="home-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`home-tab ${activeTab === tab ? 'home-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="home-tab-content">
        {renderTabContent()}
      </div>

      {isSubmitResolution &&
        <div
          className="dialog-overlay"
          onClick={() => setIsSubmitResolution(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="dialog"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <h2>Select Outcome</h2>
            <form>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="resolution"
                    value="1"
                    checked={selectedOption === 0}
                    onChange={() => setSelectedOption(0)}
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="resolution"
                    value="0"
                    checked={selectedOption === 1}
                    onChange={() => setSelectedOption(1)}
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
              </div>
              <button
                type="button"
                className="submit-resolution-button"
                onClick={handleSubmit}
                disabled={selectedOption === null}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;


