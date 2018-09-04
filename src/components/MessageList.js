import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      value: ""
    };
    this.msgRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.msgRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
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
      userId: this.props.user === null ? "guest" : this.props.user.displayName
    });
    this.setState({ value: "" });
  }

  deleteMessage(e) {
    e.preventDefault();
    this.props.firebase
      .database()
      .ref(this.messages.e)
      .remove();
  }

  render() {
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
            </colgroup>
            <tbody>
              {!this.props.activeRoom.name
                ? `there are no messages yet`
                : this.state.messages
                    .filter(
                      message => message.roomId === this.props.activeRoom.key
                    )
                    .map(message => (
                      <tr className="chat-bloc" key={message.key}>
                        <td id="user-Id">{message.userId}</td>
                        <td id="msg-content">{message.content}</td>
                        <td id="time-sent">
                          {new Date(message.sentAt * 1000).toLocaleDateString(
                            "en-US"
                          )}
                          <br />
                          <Button
                            id="del-msg"
                            onClick={e => this.deleteMessage(e)}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
        <div id="new-msg-bar">
          <form ref="form" onSubmit={e => this.createMessage(e)}>
            <footer>
              <label htmlFor="msg-entry" />
              <TextField
                type="text"
                id="msg-entry"
                multiline={true}
                fullWidth={true}
                value={this.state.value}
                onChange={e => this.handleChange(e)}
              />
              <Button variant="" color="primary" id="post-msg" type="submit">
                Post
              </Button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
export default MessageList;
