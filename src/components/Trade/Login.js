import React from 'react';
import './Login.css';
import Chart from './Chart/Chart';
import BuySell from './BuySell/BuySell';

function Login() {
  return (
    <div className="login-container">
      {/* <div className="component1">
        <Chart />
      </div> */}
      <div className="buyshell">
        <BuySell />
      </div>
    </div>
  );
}

export default Login;
