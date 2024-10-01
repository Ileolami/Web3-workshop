import { useState } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        setAccount(accounts[0]);
        setBalance(web3.utils.fromWei(balance, "ether"));
      } else {
        throw new Error("Ethereum wallet not detected");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Your Balance Checker</h1>
      </div>
      <div className="content">
        <button onClick={fetchBalance} disabled={loading}>
          {loading ? "Loading..." : "Check Balance"}
        </button>
        {error && <p className="error">{error}</p>}
        {account && <p className="account">Account: {account}</p>}
        {balance && <p className="balance">Balance: {balance} ETH</p>}
      </div>
    </div>
  );
}

export default App;
