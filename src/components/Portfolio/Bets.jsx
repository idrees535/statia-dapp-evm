import React, { useState } from 'react';
import './Bets.css'; // Import CSS for styling

function Bets() {
  const [activeTab, setActiveTab] = useState('activeBets'); // Default tab is Active Bets

  // Dummy bet data for Active Bets
  const activeBets = [
    {
      id: 1,
      market: "Will Service A experience over 30 minutes of downtime in the next 7 days?",
      outcome: "No",
      betAmount: "$150",
      payout: "$300",
      expires: "2d 3h"
    },
    {
      id: 2,
      market: "Will RPC Provider B exceed a 99.9% uptime in the next 30 days?",
      outcome: "Yes",
      betAmount: "$100",
      payout: "$200",
      expires: "1d 2h"
    },
    {
      id: 3,
      market: "Will Validator Node C be slashed for misbehavior within the next 15 days?",
      outcome: "Yes",
      betAmount: "$200",
      payout: "$400",
      expires: "3d 4h"
    },
    {
      id: 4,
      market: "Will Service Provider Z violate their SLA by failing to meet the 99.5% uptime guarantee in the next 90 days?",
      outcome: "No",
      betAmount: "$120",
      payout: "$240",
      expires: "5d 1h"
    }
  ];

  // Dummy data for Bet History
  const betHistory = [
    {
      id: 1,
      market: "Will Oracle Service A experience downtime?",
      outcome: "No",
      betAmount: "$100",
      payout: "$200",
      date: "2024-04-12"
    },
    {
      id: 2,
      market: "Will Indexer B experience manipulated data?",
      outcome: "Yes",
      betAmount: "$80",
      payout: "$160",
      date: "2024-04-10"
    }
  ];

  // Dummy data for Earnings
  const earnings = [
    {
      id: 1,
      date: "2024-04-15",
      amount: "$300"
    },
    {
      id: 2,
      date: "2024-04-13",
      amount: "$200"
    }
  ];

  // Dummy data for Account Balance
  const accountBalance = {
    balance: "$1500"
  };

  return (
    <div className="bets-container">
      <h2>Your Bets</h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'activeBets' ? 'active' : ''}`}
          onClick={() => setActiveTab('activeBets')}
        >
          Active Bets
        </button>
        <button
          className={`tab-button ${activeTab === 'betHistory' ? 'active' : ''}`}
          onClick={() => setActiveTab('betHistory')}
        >
          Bet History
        </button>
        <button
          className={`tab-button ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          Earnings
        </button>
        <button
          className={`tab-button ${activeTab === 'accountBalance' ? 'active' : ''}`}
          onClick={() => setActiveTab('accountBalance')}
        >
          Account Balance
        </button>
      </div>

      {/* Active Bets Table */}
      {activeTab === 'activeBets' && (
        <div className="bets-table">
          <table>
            <thead>
              <tr>
                <th>Market</th>
                <th>Outcome</th>
                <th>Bet Amount</th>
                <th>Potential Payout</th>
                <th>Expires in</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeBets.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.market}</td>
                  <td>{bet.outcome}</td>
                  <td>{bet.betAmount}</td>
                  <td>{bet.payout}</td>
                  <td>{bet.expires}</td>
                  <td>
                    <button className="view-button">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bet History Table */}
      {activeTab === 'betHistory' && (
        <div className="bets-table">
          <table>
            <thead>
              <tr>
                <th>Market</th>
                <th>Outcome</th>
                <th>Bet Amount</th>
                <th>Payout</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {betHistory.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.market}</td>
                  <td>{bet.outcome}</td>
                  <td>{bet.betAmount}</td>
                  <td>{bet.payout}</td>
                  <td>{bet.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Earnings Table */}
      {activeTab === 'earnings' && (
        <div className="bets-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((earning) => (
                <tr key={earning.id}>
                  <td>{earning.date}</td>
                  <td>{earning.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Account Balance */}
      {activeTab === 'accountBalance' && (
        <div className="account-balance">
          <p><strong>Current Balance: </strong>{accountBalance.balance}</p>
        </div>
      )}
    </div>
  );
}

export default Bets;
