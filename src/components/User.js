import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      console.log(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
    console.log("signed out");
  }

  render() {
    return (
      <div>
        <div id="navbar">
          <section id="username">
            <div>
              {!this.props.user ? "guest" : this.props.user.displayName}
            </div>
          </section>
          <section id="log-buttons">
            {!this.props.user ? (
              <Button id="sign-in" onClick={() => this.signIn()}>
                Login
              </Button>
            ) : null}
            <Button id="sign-out" onClick={() => this.signOut()}>
              Log out
            </Button>
          </section>
        </div>
      </div>
    );
  }
}
export default User;
