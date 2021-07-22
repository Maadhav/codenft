import React from "react";
import { Col, Row, } from 'atomize';
import { Navbar } from "./components/navbar";
import { StyleReset } from "atomize";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import Marketplace from "./components/marketplace";
import { Switch, Route } from "react-router-dom"
import DetailsPage from "./components/DetailsPage";
import MintNFT from "./components/MintNFT";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

export default ({ drizzle, drizzleState }) => {


  // destructure drizzle and drizzleState from props
  return (
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <StyleReset />
      <div className="App">
        <Navbar />
        <Row>
          {/* <Col size="2" bg="warning700"></Col> */}
          <Col size="12">
            <div style={{ height: "92vh", width: "100%" }}>
              <Switch>
                <Route exact path="/">
                  <Marketplace />
                </Route>
                <Route path="/mynfts">
                  <Marketplace />
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
    </StyletronProvider>
  );
};
