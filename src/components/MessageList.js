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
    this.setState({ value: event.target.value });
  }

  createMessage(event) {
    this.msgRef.push({
      msg: this.state.value
    });
    event.preventDefault();
    this.setState({ value: "" });
  }

  render() {
    return (
      <div id="message-list">
        <div>
          {this.state.messages.map(message => (
            <a className="single-message" key={message.key}>
              {message.msg}
            </a>
          ))}
        </div>
        <form ref="form" onSubmit={() => this.createMessage()}>
          <p>
            <label htmlFor="msg-entry" />
            <input
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
    );
  }
}
export default MessageList;
