import React, { useState } from 'react';
import { FaNetworkWired, FaBuilding, FaChartPie, FaCoins, FaExchangeAlt } from 'react-icons/fa'; // Import icons
import './Node.css'; // Import CSS for styling

function Node() {
  const [activeTab, setActiveTab] = useState('All'); // Active tab state

  // Static data for all tabs
  const data = {
    All: [
      {
        market: 'Service Provider X Downtime',
        proposition: '20 minutes in 30 days',
        consensus: 75,
        projectedOutcome: 'Yes',
        risk: '53% High Risk',
        riskLevel: 'high'
      },
      {
        market: 'Oracle Y Accuracy',
        proposition: '90% correct predictions',
        consensus: 85,
        projectedOutcome: 'Highly Accurate',
        risk: '60% Moderate Risk',
        riskLevel: 'moderate'
      },
      {
        market: 'Stablecoin Z Depeg',
        proposition: '1% depeg in 7 days',
        consensus: 30,
        projectedOutcome: 'No',
        risk: '45% Low Risk',
        riskLevel: 'low'
      },
      {
        market: 'Node A Performance',
        proposition: '99.99% uptime in 30 days',
        consensus: 90,
        projectedOutcome: 'Very Likely',
        risk: '75% Low Risk',
        riskLevel: 'low'
      },
      {
        market: 'Transaction Delay B',
        proposition: 'Over 10 min delay in 24 hrs',
        consensus: 50,
        projectedOutcome: 'No',
        risk: '50% Medium Risk',
        riskLevel: 'medium'
      },
      {
        market: 'Service Provider C Response',
        proposition: 'Under 1 hr support response',
        consensus: 80,
        projectedOutcome: 'Likely',
        risk: '65% Moderate Risk',
        riskLevel: 'moderate'
      }
    ],
    Nodes: [
      {
        market: 'Node A Performance',
        proposition: '99.99% uptime in 30 days',
        consensus: 90,
        projectedOutcome: 'Very Likely',
        risk: '75% Low Risk',
        riskLevel: 'low'
      }
    ],
    Infrastructure: [
      {
        market: 'Service Provider X Downtime',
        proposition: '20 minutes in 30 days',
        consensus: 75,
        projectedOutcome: 'Yes',
        risk: '53% High Risk',
        riskLevel: 'high'
      },
      {
        market: 'Service Provider C Response',
        proposition: 'Under 1 hr support response',
        consensus: 80,
        projectedOutcome: 'Likely',
        risk: '65% Moderate Risk',
        riskLevel: 'moderate'
      }
    ],
    Oracles: [
      {
        market: 'Oracle Y Accuracy',
        proposition: '90% correct predictions',
        consensus: 85,
        projectedOutcome: 'Highly Accurate',
        risk: '60% Moderate Risk',
        riskLevel: 'moderate'
      }
    ],
    'Stablecoins Depeg': [
      {
        market: 'Stablecoin Z Depeg',
        proposition: '1% depeg in 7 days',
        consensus: 30,
        projectedOutcome: 'No',
        risk: '45% Low Risk',
        riskLevel: 'low'
      }
    ],
    'Transaction Delays': [
      {
        market: 'Transaction Delay B',
        proposition: 'Over 10 min delay in 24 hrs',
        consensus: 50,
        projectedOutcome: 'No',
        risk: '50% Medium Risk',
        riskLevel: 'medium'
      }
    ]
  };

  return (
    <div className="node-container">
      {/* Tabs with icons */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button
          className={`tab-button ${activeTab === 'Nodes' ? 'active' : ''}`}
          onClick={() => setActiveTab('Nodes')}
        >
          <FaNetworkWired /> Nodes
        </button>
        <button
          className={`tab-button ${activeTab === 'Infrastructure' ? 'active' : ''}`}
          onClick={() => setActiveTab('Infrastructure')}
        >
          <FaBuilding /> Infrastructure
        </button>
        <button
          className={`tab-button ${activeTab === 'Oracles' ? 'active' : ''}`}
          onClick={() => setActiveTab('Oracles')}
        >
          <FaChartPie /> Oracles
        </button>
        <button
          className={`tab-button ${activeTab === 'Stablecoins Depeg' ? 'active' : ''}`}
          onClick={() => setActiveTab('Stablecoins Depeg')}
        >
          <FaCoins /> Stablecoins Depeg
        </button>
        <button
          className={`tab-button ${activeTab === 'Transaction Delays' ? 'active' : ''}`}
          onClick={() => setActiveTab('Transaction Delays')}
        >
          <FaExchangeAlt /> Transaction Delays
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Market</th>
              <th>Proposition</th>
              <th>Consensus</th>
              <th>Projected Outcome</th>
              <th>% Odds to Hit</th>
            </tr>
          </thead>
          <tbody>
            {data[activeTab].map((row, index) => (
              <tr key={index}>
                <td>{row.market}</td>
                <td>{row.proposition}</td>
                <td>
                  <div className="consensus-bar">
                    <div className="bar" style={{ width: `${row.consensus}%` }}></div>
                    <span>{row.consensus}</span>
                  </div>
                </td>
                <td>{row.projectedOutcome}</td>
                <td>
                  <span className={`risk-label ${row.riskLevel}`}>{row.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Node;
