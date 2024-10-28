import React from 'react';
import './LeaderBoard.css';  // Import CSS for styling

function LeaderBoard() {
  return (
    <div className="leaderboard-container">
      <h2>Will Provider X experience downtime in the next 30 days?</h2>

      {/* Prediction progress */}
      <div className="prediction-progress">
        <div className="progress-bar">
          <div className="progress-bar-filled" style={{ width: '40%' }}></div>
        </div>
        <p className='chances'>40% chance of happening</p>
        <p className="bet-summary">$1,000,000 bet over 10,000 times</p>
      </div>

      {/* Bet section */}
      <div className="market-bet">
        <h3>Bet on this market</h3>
        <div className="bet-options">
          <div className="bet-option">
            <div>
              <span className="bet-label">Yes</span>
              <p className="odds-text">Current odds: 40%</p>
            </div>
            <span className="bet-amount">0.4</span>
          </div>
          <div className="bet-option">
            <div>
              <span className="bet-label">No</span>
              <p className="odds-text">Current odds: 60%</p>
            </div>
            <span className="bet-amount">0.6</span>
          </div>
        </div>
      </div>

      {/* Recent bets */}
      <div className="recent-bets">
        <h3>Most recent bets</h3>
        <ul>
          <li>
            <div className="recent-bet-info">
              <span className="recent-anonymous">Anonymous</span>
              <span className="recent-choice">No</span>
            </div>
            <span className="bet-amount">0.6</span>
          </li>
          <li>
            <div className="recent-bet-info">
              <span className="recent-anonymous">Anonymous</span>
              <span className="recent-choice">Yes</span>
            </div>
            <span className="bet-amount">0.4</span>
          </li>
          <li>
            <div className="recent-bet-info">
              <span className="recent-anonymous">Anonymous</span>
              <span className="recent-choice">Yes</span>
            </div>
            <span className="bet-amount">0.4</span>
          </li>
          <li>
            <div className="recent-bet-info">
              <span className="recent-anonymous">Anonymous</span>
              <span className="recent-choice">No</span>
            </div>
            <span className="bet-amount">0.6</span>
          </li>
        </ul>
      </div>

      {/* Bet now button */}
      <div className="bet-now-container">
        <button className="bet-now-button">Bet Now</button>
      </div>
    </div>
  );
}

export default LeaderBoard;
