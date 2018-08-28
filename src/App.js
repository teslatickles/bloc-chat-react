import React, { Component } from "react";
import * as firebase from "firebase";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
        <MessageList firebase={firebase} />
      </div>
    );
  }
}
export default App;
