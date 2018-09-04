import React, { Component } from "react";
import * as firebase from "firebase";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

var config = {
  apiKey: "AIzaSyAoEMQPlAibTOu-KRI-PkOEQRki7i9n-0Q",
  authDomain: "bloc-chat-react-c2e5e.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c2e5e.firebaseio.com",
  projectId: "bloc-chat-react-c2e5e",
  storageBucket: "bloc-chat-react-c2e5e.appspot.com",
  messagingSenderId: "403233404950"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      user: ""
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  handleClick(room) {
    console.log(room);
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <User
          firebase={firebase}
          setUser={this.setUser.bind(this)}
          user={this.state.user}
        />
        <RoomList
          firebase={firebase}
          handleClick={this.handleClick.bind(this)}
          activeRoom={this.state.activeRoom}
        />
        <MessageList
          firebase={firebase}
          handleRoom={this.handleClick.bind(this)}
          activeRoom={this.state.activeRoom}
          user={this.state.user}
        />
      </div>
    );
  }
}
export default App;
