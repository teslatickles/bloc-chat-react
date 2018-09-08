import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import MainChat from "./components/MainChat";
import Landing from "./components/Landing";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link className="routes" to="/">
              Home
            </Link>
            <Link className="routes" to="/main-chat">
              ChatAt
            </Link>
          </nav>
          <h1>ChatAt</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/main-chat" component={MainChat} />
        </main>
      </div>
    );
  }
}
export default App;
