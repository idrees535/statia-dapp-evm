import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'; // Importing icons
import './Claims.css'; // Import CSS for styling

function Claims() {
  // Initial state with all bet data
  const bets = [
    {
      id: 1,
      question: "Will Oracle Service A experience over 30 minutes of downtime in the next 7 days?",
      outcome: "Yes",
      payout: "0.99 DAI",
      icon: <FiTrendingUp size={24} />
    },
    {
      id: 2,
      question: "Will RPC Provider B exceed a 99.9% uptime in the next 30 days?",
      outcome: "No",
      payout: "0.99 DAI",
      icon: <FiTrendingDown size={24} />
    },
    {
      id: 3,
      question: "Will Validator Node C be slashed for misbehavior within the next 15 days?",
      outcome: "Yes",
      payout: "0.99 DAI",
      icon: <FiTrendingUp size={24} />
    },
    {
      id: 4,
      question: "Will Service D encounter any downtime in the next week?",
      outcome: "No",
      payout: "1.00 DAI",
      icon: <FiTrendingDown size={24} />
    },
    {
      id: 5,
      question: "Will Network E experience network instability in the next 14 days?",
      outcome: "Yes",
      payout: "0.98 DAI",
      icon: <FiTrendingUp size={24} />
    },
    {
      id: 6,
      question: "Will Provider F exceed 99% uptime in the next 30 days?",
      outcome: "No",
      payout: "1.00 DAI",
      icon: <FiTrendingDown size={24} />
    }
  ];

  const [visibleBets, setVisibleBets] = useState(3); // Start by displaying 3 items

  const handleLoadMore = () => {
    // Load 3 more items each time
    setVisibleBets(prevVisibleBets => prevVisibleBets + 3);
  };

  return (
    <div className="claims-container">
      <h2>Claim your winnings</h2>
      <div className="winning-bets-section">
        <h3>Winning bets</h3>
        {bets.slice(0, visibleBets).map((bet) => (
          <div className="bet-item" key={bet.id}>
            <div className="bet-icon">
              {bet.icon}
            </div>
            <div className="bet-info">
              <p className="bet-question">{bet.question}</p>
              <p className="bet-details">You bet 1.00 DAI on {bet.outcome} to win a payout of {bet.payout}</p>
            </div>
            <button className="claim-button">Claim</button>
          </div>
        ))}

        {visibleBets < bets.length && (
          <div className="load-more">
            <button className="load-more-button" onClick={handleLoadMore}>Load more</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Claims;
