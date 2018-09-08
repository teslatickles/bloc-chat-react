import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Fingerprint from "@material-ui/icons/Fingerprint";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "react-avatar";

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
          <Card id="card">
            <CardActionArea id="top-card">
              {!this.props.user ? (
                <Avatar name="guest" size="115" round={true} />
              ) : (
                <Avatar
                  id="profile-pic"
                  googleId={googleId}
                  size="115"
                  round={true}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  <section id="username">
                    <div id="user-header">
                      {!this.props.user ? "guest" : this.props.user.displayName}
                    </div>
                  </section>
                </Typography>
                <Typography component="p">is signed in</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions id="top-buttons">
              {!this.props.user ? (
                <IconButton id="sign-in" onClick={() => this.signIn()}>
                  <Fingerprint />
                  Login
                </IconButton>
              ) : (
                <IconButton id="sign-out" onClick={() => this.signOut()}>
                  <Fingerprint />
                  log out
                </IconButton>
              )}
              <Button size="small" color="secondary">
                Home
              </Button>
              <Button size="small" color="primary">
                Settings
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}
export default User;
