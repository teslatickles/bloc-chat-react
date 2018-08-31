import React, { Component } from "react";

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
      name: this.state.value
    });
    this.setState({ value: "" });
  }

  render() {
    return (
      <div className="roomSidenav">
        <div id="roomlist">
          <h1 id="active-room">{this.props.activeRoom.name}</h1>
          {this.state.rooms.map(room => (
            <a key={room.key} onClick={() => this.props.handleClick(room)}>
              {room.name}
            </a>
          ))}
        </div>
        <form ref="form" onSubmit={e => this.createRoom(e)}>
          <fieldset id="new-fieldset">
            <legend />
            <p>
              <label htmlFor="room-name" />
              <input
                type="text"
                id="room-name"
                name="newRoom"
                value={this.state.value}
                onChange={e => this.handleChange(e)}
              />
              <button
                id="addRoom"
                type="submit"
                name="addRoom"
                value="Add Room"
              >
                Add Room
              </button>
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default RoomList;
