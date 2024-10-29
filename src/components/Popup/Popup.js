// src/components/Popup/Popup.js

import React from 'react';
import './Popup.css'; // Ensure this CSS file exists and is correctly styled

function Popup({ show, onClose, txHash }) {
  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>X</button>
        <h2>Transaction Successful!</h2>
        <p><strong>Transaction Hash:</strong></p>
        {txHash ? (
          <p>
            <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
              {txHash.slice(0, 10)}...{/* Shortened for readability */}
            </a>
          </p>
        ) : (
          <p>N/A</p>
        )}
      </div>
    </div>
  );
}

export default Popup;
