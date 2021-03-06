import React, { useContext, useEffect } from "react";
import { Col, Row, } from 'atomize';
import { Navbar } from "./components/navbar";
import { StyleReset } from "atomize";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import Marketplace from "./components/marketplace";
import { Switch, Route, useLocation } from "react-router-dom"
import DetailsPage from "./components/DetailsPage";
import MintNFT from "./components/MintNFT";
import MyNFTs from "./components/mynfts";
import Web3 from "web3"
import SideBar from "./components/SideBar";
import { Web3Context } from "./Web3Context";
import ConnectWallet from "./components/ConnectWallet";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

export default () => {
  const location = useLocation()
  const [web3,] = useContext(Web3Context)
  // var portis = new Portis('f92f78e0-f2e3-4e31-a99e-8d34d4a7087f',{
  //   nodeUrl: "https://rpc-mumbai.maticvigil.com/",
  //   chainId:"80001",
  // })
  // var web3 = new Web3('ws://127.0.0.1:7545')
  web3.eth.getAccounts(console.log)
  return (
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <StyleReset />
      <div className="App">
        {
          location.pathname.includes("mint") ? <></>:
          <Navbar />
        }
        <Row>
          {/* <Col size="2" bg="warning700"></Col> */}
          {
            (location.pathname.includes("mint") || location.pathname.includes("details")) ? <></>:
          <Col size="2">
          <SideBar />
          </Col>
        }
          <Col size={(location.pathname.includes("mint") || location.pathname.includes("details")) ?"12" :"10"}>
            <div style={{ height: "92vh", width: "100%" }}>
              <Switch>
                <Route exact path="/">
                  <Marketplace />
                </Route>
                <Route path="/mynfts">
                  <MyNFTs />
                </Route>
                <Route path="/details/:id?">
                  <DetailsPage />
                </Route>
                <Route path="/mint">
                  <MintNFT />
                </Route>
                <Route path="/mynfts/details/:id?">
                  <DetailsPage />
                </Route>
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
      {/* <ConnectWallet isOpen={true}/> */}
    </StyletronProvider>
  );
};
