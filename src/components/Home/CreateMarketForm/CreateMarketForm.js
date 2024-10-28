import React, { useState } from 'react';
import './CreateMarketForm.css';
import { ethers } from 'ethers';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import MarketFactoryABI from '../../../contracts/MarketFactory.json';
import ERC20ABI from '../../../contracts/ERC20Token.json';
import SuccessDialog from "./SuccessDialog"

function CreateMarketForm() {
  const [formData, setFormData] = useState({
    marketDescription: '',
    category: '',
    marketOutcome: 'Yes/No',
    oracleAddress: '',
    feePercentage: '',
    marketDuration: '',
    tokenAddress: '',
    initialFunds: '',
    rules: '',
    b: '',
    additionalDetails: '',
    feeRecipient: ''
  });


  const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_ADDRESS;
  const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    // Set up provider and signer
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    // Get contract instances from provided addresses
    const token = new Contract(TOKEN_ADDRESS, ERC20ABI, signer);
    const factory = new Contract(FACTORY_ADDRESS, MarketFactoryABI, signer);
    const factoryAddress = await factory.getAddress();

    console.log("Factory Address:", await factory.getAddress());
    console.log("Token Address:", await token.getAddress());

    console.log("Signer Address:", await signer.getAddress());

    //const feePercentage = formData.feePercentage;//ethers.parseUnits(formData.feePercentage);
    const feePercentage = parseInt(formData.feePercentage, 10);

    // Generate random market ID and outcomes
    const marketId = Math.floor(Math.random() * 1000000);
    const outcomes = formData.marketOutcome.split("/");
    const initialFunds = ethers.parseUnits(formData.initialFunds, 18);
    const approveTx = await token.approve(factoryAddress, initialFunds);

    await approveTx.wait();
    console.log("Factory approved to spend initial funds.");
    const allowance = await token.allowance(signer.address, FACTORY_ADDRESS);
    console.log("Current Allowance:", allowance.toString());

    factory.once("MarketCreated", (marketAddress) => {
      const message = `Market has been created at address: ${marketAddress}`;
      setDialogMessage(message); // Set message for dialog
      setIsDialogOpen(true);
    });

    try {
      const tx = await factory.createMarket(
        marketId,
        formData.marketDescription,
        outcomes,
        formData.oracleAddress,
        formData.b,
        formData.marketDuration,
        feePercentage,
        formData.feeRecipient,  
        TOKEN_ADDRESS,
        initialFunds
      );
      await tx.wait();
      console.log("Market created successfully!");
      //console.log(tx);
      factory.on("MarketCreated", (marketAddress) => {
        console.log("New Market Address:", marketAddress);
      });

    } catch (error) {
      console.error("Error creating market:", error);
    }
  };
  return (
    <form className="create-market-form" onSubmit={handleSubmit}>
      <h2>Create a New Market</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Market Title</label>
          <input
            type="text"
            name="marketDescription"
            placeholder="Enter your Market Descripton here i.e Will service provder X face a delay in next 30 days?"

            value={formData.marketDescription}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Market Outcomes</label>
          <div className="button-group">
            <button
              type="button"
              className={formData.marketOutcome === 'Yes/No' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, marketOutcome: 'Yes/No' })}
            >
              Yes/No
            </button>
            <button
              type="button"
              className={formData.marketOutcome === 'Multiple outcomes' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, marketOutcome: 'Multiple outcomes' })}
            >
              Multiple outcomes
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Initial Funds</label>
          <input
            type="number"
            name="initialFunds"
            placeholder="Inital market funds in $USD"
            value={formData.initialFunds}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">

        <div className="form-group">
          <label>Liquidity Parameter (b)
          </label>
          <input
            type="text"
            name="b"
            placeholder="Enter your Liquidity Parameter (b)"
            value={formData.b}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Market Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Node">Node</option>
            <option value="Oracle">Oracle</option>
            <option value="Defi">Defi</option>
            <option value="AI Services">AI Services</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Market Duration</label>
          <input
            type="number"
            name="marketDuration"
            placeholder="Duration of market (in seconds)"
            value={formData.marketDuration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fee Percentage</label>
          <input
            type="number"
            name="feePercentage"
            placeholder="Enter your Fee percentage"
            value={formData.feePercentage}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Oracle Address</label>
          <input
            type="text"
            name="oracleAddress"
            placeholder="Enter your Oracle address"
            value={formData.oracleAddress}
            onChange={handleChange}
          />
        </div>

      </div>
           {/* Fee Recipient */}
    <div className="form-row">
        <div className="form-group">
          <label>Fee Recipient Address</label>
         <input
            type="text"
            name="feeRecipient"
            placeholder="Enter Fee Recipient address"
            value={formData.feeRecipient}
            onChange={handleChange}
            
          />
          
        </div>
      </div>

      

      <div className="form-row">
        <div className="form-group">
          <label>Rules</label>
          <textarea
            name="rules"
            placeholder="Market Rules i.e settlement"
            value={formData.rules}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Additional Details and Links</label>
          <textarea
            name="additionalDetails"
            placeholder="Any additional Details and links"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button">Cancel</button>
        <button type="submit">Create Market</button>
      </div>
      {isDialogOpen && (
        <SuccessDialog
          message={dialogMessage}
        />
      )}
    </form>
    
  );
}

export default CreateMarketForm;



