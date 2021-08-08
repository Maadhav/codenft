import React, { useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { Web3Context } from "./Web3Context";
import Web3 from "web3";
import Portis from "@portis/web3";

import Web3Modal from "web3modal";

const portis = new Portis('dappId', myPrivateEthereumNode);
const App = () => {
  const [web3, setWeb3] = useState(window.ethereum);
  const [loading, setLoading] = useState(true);
  async function connectWallet() {
    // if (window.ethereum) {
    //   window.web3 = new Web3(window.ethereum);
    // }

    // let conn = await window.ethereum.enable();

    // let ethconnected = conn.length > 0;
    // if (ethconnected) {
    //   let ethaddress = conn[0]; // get wallet address
    // }
    // window.web3.eth.getAccounts().then(console.log);
    const providerOptions = {
      portis: {
        package: Portis, // required
        options: {
          id: "f92f78e0-f2e3-4e31-a99e-8d34d4a7087f", // required
          nodeUrl: 'https://localhost:7545',
          chainId: 1337,
        }
      }
    };
    
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions
    });
    
    const provider = await web3Modal.connect();
    
    const web3Provider = new Web3(provider);
    
    setWeb3(
      web3Provider
    );
    setLoading(false);
    return true;
  }


  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <Router>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Web3Context.Provider value={[web3, setWeb3]}>
          <Home />
        </Web3Context.Provider>
      )}
    </Router>
  );
};

export default App;
