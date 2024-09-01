import { useState, useEffect } from "react";
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import Web3 from "web3";
import "./App.css";

function App() {
  const [variable, setVariable] = useState('0000000000')

  // 2. Intialize 
  const web3 = new Web3(window.ethereum);

  web3.registerPlugin(new ChainlinkPlugin());

  
  async function doSomething() {
    const result = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd);

    setVariable(result.answer.toString().substring(0, 5));
  
  }

  return (
    <>
      <div>
        <button onClick={doSomething}>Get price</button>
      </div>

      <div>
        <p>Crypto price : {variable}</p>
      </div>
    </>
  );
}

export default App;
