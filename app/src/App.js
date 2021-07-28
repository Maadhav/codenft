import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <Router>

    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return "Loading..."
          }
          
          return (
            <Home drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
          </Router>
  );
}

export default App;
