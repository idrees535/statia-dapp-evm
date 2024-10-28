import React, { useState } from 'react';
import { FiTrendingDown } from 'react-icons/fi'; // Importing icon
import './Markets.css'; // Import CSS for styling

function Markets() {
  const [activeTab, setActiveTab] = useState('assigned'); // State for active tab

  // Markets data (this can be dynamic later)
  const markets = {
    assigned: [
      {
        id: 1,
        description: "Will AI-agent-driven Oracle A provide incorrect data within the next 14 days?",
        payout: "$500"
      },
      {
        id: 2,
        description: "Will Indexer B return manipulated data or experience downtime in the next 7 days?",
        payout: "$500"
      }
    ],
    submitResult: [
      {
        id: 3,
        description: "Will Blockchain X experience more than 2 hours of cross-chain bridge downtime in the next 30 days?",
        action: "Submit Result"
      }
    ],
    disputeResolution: [
      {
        id: 4,
        description: "Will AI-agent-driven Oracle A provide incorrect data within the next 14 days?",
        action: "Resolve Dispute"
      }
    ]
  };

  return (
    <div className="markets-container">
      <div className="headerhaha">
        <h2>Manage Markets</h2>
        <button className="leaderboard-button">View Leaderboard</button>
      </div>
      
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('assigned')}
        >
          Assigned Markets
        </button>
        <button
          className={`tab-button ${activeTab === 'submitResult' ? 'active' : ''}`}
          onClick={() => setActiveTab('submitResult')}
        >
          Submit Result
        </button>
        <button
          className={`tab-button ${activeTab === 'disputeResolution' ? 'active' : ''}`}
          onClick={() => setActiveTab('disputeResolution')}
        >
          Dispute Resolution
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'assigned' && (
          <div className="market-list">
            <h3>Assigned Markets</h3>
            {markets.assigned.map(market => (
              <div className="market-item" key={market.id}>
                <div className="market-icon">
                  <FiTrendingDown size={24} />
                </div>
                <div className="market-info">
                  <p>{market.description}</p>
                  <p className="market-status">Yes/No</p>
                </div>
                <span className="market-payout">{market.payout}</span>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'submitResult' && (
          <div className="market-list">
            <h3>Submit Result</h3>
            {markets.submitResult.map(market => (
              <div className="market-item" key={market.id}>
                <div className="market-icon">
                  <FiTrendingDown size={24} />
                </div>
                <div className="market-info">
                  <p>{market.description}</p>
                  <p className="market-status">Yes/No</p>
                </div>
                <button className="action-button">Submit Result</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'disputeResolution' && (
          <div className="market-list">
            <h3>Dispute Resolution</h3>
            {markets.disputeResolution.map(market => (
              <div className="market-item" key={market.id}>
                <div className="market-icon">
                  <FiTrendingDown size={24} />
                </div>
                <div className="market-info">
                  <p>{market.description}</p>
                  <p className="market-status">Yes/No</p>
                </div>
                <button className="action-button">Resolve Dispute</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Markets;
