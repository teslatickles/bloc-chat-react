import React, { Component } from "react";
import Avatar from "react-avatar";
import ".././styles/user_style.css";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = { googleId: "113159909236100108121" };
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
    const { googleId } = this.state;
    return (
      <div>
        <div id="bar">
          <div id="user-card">
            <div id="profile-pic">
              {!this.props.user ? (
                <Avatar name="guest" size="80" round={true} />
              ) : (
                <Avatar googleId={googleId} size="80" round={true} />
              )}
              <section id="username">
                <div id="user-header">
                  {!this.props.user ? "guest" : this.props.user.displayName}
                </div>
              </section>

              <div id="top-buttons" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
