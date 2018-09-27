import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import MainChat from "./components/MainChat";
import Landing from "./components/Landing";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Forum";
import TrendIcon from "@material-ui/icons/TrendingDown";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      modState: false
    };
    this.toggleModState = this.toggleModState.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(open) {
    this.setState({
      right: open
    });
    console.log(this.state.right);
  }

  toggleModState(truth) {
    this.setState({
      modState: truth
    });
    console.log(this.props.modState, "oh-no");
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link className="routes" id="home-route" to="/">
            <Button id="home-button">
              <HomeIcon id="home-icon" />
              <br />
              Home
            </Button>
          </Link>
          <Link className="routes" id="chat-route" to="/main-chat">
            <Button id="chat-button">
              <ChatIcon id="chat-route-icon" />
              <br />
              Rooms
            </Button>
          </Link>
        </header>

        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/main-chat" component={MainChat} />
        </main>
        <div>
          <Button id="dashboard-button" onClick={() => this.toggleDrawer(true)}>
            Dashboard
            <TrendIcon />
          </Button>
        </div>
        <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
            <Button onClick={() => this.toggleModState(true)}>
              Edit Messages
            </Button>
            <Button onClick={null}>Favorites</Button>
            <Button>Logout</Button>
            <img src="" />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}
export default App;
