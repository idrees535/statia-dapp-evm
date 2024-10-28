import { AppRoute } from "./routes";
import { WalletProvider } from './utils/WalletContext'; // Adjust the path
import Headers from "./components/Headers/Headers";

function App() {
  return <>
    <WalletProvider>
      <Headers />
      <AppRoute />
    </WalletProvider>

  </>
}

export default App;


// import React, { useState } from 'react';
// import { AppRoute } from "./routes"; // Assuming this handles routing
// import "./App.css"
// import WalletButton from './components/WalletButton'; // Make sure this is imported
// import BuyShare from './components/BuyShare/BuyShare'; // Your BuyShare component

// function App() {
//   const [walletAddress, setWalletAddress] = useState(null); // Store wallet address

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Prediction Market App</h1>
//         {!walletAddress ? (
//           <WalletButton setWalletAddress={setWalletAddress} />
//         ) : (
//           <p>Wallet Address: {walletAddress}</p>
//         )}
//       </header>

//       {walletAddress && <BuyShare walletAddress={walletAddress} />} {/* Only render BuyShare when the wallet is connected */}
//     </div>
//   );
// }

// export default App;
