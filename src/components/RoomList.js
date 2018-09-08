import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.value !== "" ? this.state.value : `untitled room`
    });
    this.setState({ value: "" });
  }

  render() {
    return (
      <div className="roomSidenav">
        <div id="roomlist">
          <div id="room-top-bar">
            <h1 id="chat-name">ChatAt</h1>
            <Icon id="chat-icon" class="material-icons">
              forum
            </Icon>
          </div>
          {this.state.rooms.map(room => (
            <a key={room.key} onClick={() => this.props.handleClick(room)}>
              {room.name}
            </a>
          ))}
        </div>
        <form ref="form" id="room-btm-bar" onSubmit={e => this.createRoom(e)}>
          <div id="newChat-dialog">start a new chat: </div>
          <fieldset id="new-fieldset">
            <legend />
            <p>
              <label htmlFor="room-name" />
              <TextField
                type="text"
                id="room-name"
                name="newRoom"
                value={this.state.value}
                onChange={e => this.handleChange(e)}
              />
              <IconButton
                variant="contained"
                color="primary"
                id="addRoom"
                type="submit"
                name="addRoom"
                value="Add Room"
              >
                <i id="newRoom-icon" class="material-icons">
                  meeting_room
                </i>
              </IconButton>
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default RoomList;
