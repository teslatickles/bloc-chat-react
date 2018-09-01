import React, { Component } from "react";

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
      userId: -1
    });
    this.setState({ value: "" });
  }

  render() {
    return (
      <div>
        <div id="message-list">
          {this.state.messages
            .filter(message => message.roomId === this.props.activeRoom.key)
            .map(message => (
              <a className="single-message" key={message.key}>
                {message.content}
              </a>
            ))}
        </div>
        <div id="new-msg-bar">
          <form ref="form" onSubmit={e => this.createMessage(e)}>
            <p>
              <label htmlFor="msg-entry" />
              <textarea
                type="text"
                id="msg-entry"
                value={this.state.value}
                onChange={e => this.handleChange(e)}
              />
              <button id="post-msg" type="submit">
                Post
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
export default MessageList;
