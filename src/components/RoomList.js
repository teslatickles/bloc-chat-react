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

  createRoom(event) {
    event.preventDefault();
    this.roomsRef.push({
      name: this.state.value
    });
  }

  render() {
    return (
      <div className="roomSidenav">
        <div id="roomlist">
          {this.state.rooms.map(room => (
            <a key={room.key}>{room.name}</a>
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
