import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function Main() {
  return (
    <div>
      <h1>Main</h1>
      <Router>
        <Switch></Switch>
      </Router>
    </div>
  );
}

export default Main;
