import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BiSearch, BiUserCircle } from "react-icons/bi"; // Profile icon added
import { useWallet } from '../../utils/WalletContext'; // Adjust the path
import "./Headers.css";

function Headers() {
  const { walletAddress, handleConnectWallet } = useWallet();

  // Shorten the wallet address
  const formattedAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : null;

  return (
    <nav className="header">
      <div className="header-left">
        <Link to="/" className="header-title">
          <h2>Stateless</h2>
        </Link>
      </div>

      <div className="header-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Home</NavLink>
        <NavLink to="/markets" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Markets</NavLink>
        <NavLink to="/bets" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>My Portfolio</NavLink>
        <NavLink to="/claims" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Claims</NavLink>
        <NavLink to="/node" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Oracle</NavLink>
      </div>

      <div className="header-right">
        {walletAddress ? (
          <p className="wallet-address">{formattedAddress}</p>
        ) : (
          <button className="connect-button" onClick={handleConnectWallet}>Connect Wallet</button>
        )}
        <div className="search-icon">
          <BiSearch size={22} />
        </div>
        <div className="profile">
          <BiUserCircle size={32} className="profile-icon" /> {/* Profile icon from react-icons */}
        </div>
      </div>
    </nav>
  );
}

export default Headers;
