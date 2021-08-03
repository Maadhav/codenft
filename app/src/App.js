import React, { useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { Web3Context } from "./Web3Context";
import Web3 from "web3"


const App = () => {

  const [web3, setWeb3] = useState(new Web3(window.ethereum ? window.ethereum :  window.web3.currentProvider))

  const [loading, setLoading] = useState(true)
  return (
    <Router>
      <Web3Context.Provider value={[web3,setWeb3]}>

            <Home/>
      </Web3Context.Provider>
          </Router>
  );
}

export default App;
