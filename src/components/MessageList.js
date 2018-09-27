import React, { Component } from "react";
import SansMsgView from "./SansMsgView";
import Avatar from "react-avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ".././styles/message-list_style.css";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      value: "",
      favorite: false
    };
    this.deleteMessage = this.deleteMessage.bind(this);
    this.msgRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.msgRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });

    this.msgRef.on("child_removed", snapshot => {
      const deletedMessage = snapshot.val();
      deletedMessage.key = snapshot.key;
      this.setState({
        messages: this.state.messages.filter(
          message => deletedMessage.key !== message.key
        )
      });
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.msgRef.push({
      content: this.state.value,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      userId: this.props.user === null ? "guest" : this.props.user.displayName,
      favorite: this.state.favorite
    });
    this.setState({ value: "" });
    this.scrollToBottom();
  }

  deleteMessage(msgKey) {
    const msgToDel = this.props.firebase.database().ref(`messages/${msgKey}`);
    msgToDel.remove();
    console.log(`Message at key: ${msgKey} has been removed!`);
  }

  formatTimestamp(timestamp) {
    const d = new Date(timestamp);
    const yyyy = d.getFullYear();
    const mm = ("0" + (d.getMonth() + 1)).slice(-2);
    const dd = ("0" + d.getDate()).slice(-2);
    const hh = d.getHours();
    let h = hh;
    const min = ("0" + d.getMinutes()).slice(-2);
    let time = "";
    let ampm = "AM";

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh === 0) {
      h = 12;
    }

    // ie: 2020-03-10, 11:38
    time = `${mm}/${dd}/${yyyy} ${h}:${min} ${ampm}`;
    return time;
  }

  favoriteMsg(targetMessage) {
    this.setState({ favorite: true });
    console.log("working on it");
    console.log(this.props.editable);
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "instant" });
  }

  render() {
    const editYes = this.props.modState;
    const trashStyles = {
      color: "crimson"
    };
    return (
      <div>
        <div id="active-room">
          <h2>{this.props.activeRoom.name}</h2>
        </div>
        <div id="message-list">
          <table id="msg-tbl">
            <colgroup>
              <col id="user" />
              <col id="msg-content" />
              <col id="time-stamp" />
              <col id="trash-fav" />
            </colgroup>
            <tbody>
              {!this.props.activeRoom.name ? (
                <SansMsgView />
              ) : (
                this.state.messages
                  .filter(
                    message => message.roomId === this.props.activeRoom.key
                  )
                  .map(message => (
                    <tr className="chat-bloc" key={message.key}>
                      <td id="user-Id">
                        <Avatar
                          round={true}
                          size={50}
                          googleId={this.props.googleId}
                        />
                        {message.userId}
                      </td>
                      <td id="msg-content">{message.content}</td>
                      <td id="time-sent">
                        {this.formatTimestamp(message.sentAt)}
                      </td>
                      <td>
                        {this.props.modState ? (
                          <IconButton
                            id="del-msg"
                            aria-label="Delete"
                            style={!this.state.favorite ? null : trashStyles}
                            onClick={() => this.deleteMessage(message.key)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          <div id="heart-icon">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  icon={<FavoriteBorder />}
                                  checkedIcon={
                                    !this.state.favorite ? (
                                      <FavoriteBorder />
                                    ) : (
                                      <Favorite />
                                    )
                                  }
                                  value="checkedH"
                                  onClick={() => this.favoriteMsg(message.key)}
                                />
                              }
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        {!this.props.activeRoom.name ? null : (
          <div id="bottom-blank">
            <div id="new-msg-bar">
              <form
                ref={el => (this.msgForm = el)}
                onSubmit={e => this.createMessage(e)}
              >
                <footer>
                  <label htmlFor="msg-entry" />
                  <TextField
                    type="text"
                    id="msg-entry"
                    label="Express yourself"
                    placeholder="かくかくしかじか"
                    autoComplete="false"
                    multiline={false}
                    fullWidth={true}
                    autoFocus={true}
                    value={this.state.value}
                    onChange={e => this.handleChange(e)}
                  />
                  <Button color="primary" id="post-msg" type="submit">
                    Post
                  </Button>
                </footer>
              </form>
            </div>
          </div>
        )}
        <div
          ref={el => {
            this.el = el;
          }}
          id="end-of-messages"
        />
      </div>
    );
  }
}
export default MessageList;
