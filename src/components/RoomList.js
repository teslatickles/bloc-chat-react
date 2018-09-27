import React, { Component } from "react";
import MediaQuery from "react-responsive";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Dashboard from "@material-ui/icons/Dashboard";
import ".././styles/room-list_style.css";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: "",
      editMode: false,
      showingRooms: false
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.toggleEdit = this.toggleEdit.bind(this);
    this.showRoomList = this.showRoomList.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
    this.roomsRef.on("child_removed", snapshot => {
      const deletedRoom = snapshot.val();
      deletedRoom.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.filter(room => deletedRoom.key !== room.key)
      });
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  toggleEdit() {
    if (!this.state.editMode) {
      this.setState({ editMode: true });
    } else {
      this.setState({ editMode: false });
    }
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.value !== "" ? this.state.value : `untitled room`
    });
    this.setState({ value: "" });
  }

  deleteRoom(roomKey) {
    const roomToDel = this.props.firebase.database().ref(`rooms/${roomKey}`);
    roomToDel.remove();
  }

  showRoomList(truth) {
    if (!this.state.showingRooms) {
      this.setState({
        showingRooms: truth
      });
    } else {
      this.setState({
        showingRooms: truth
      });
    }
  }

  render() {
    const selectedRoom = {
      color: "peru"
    };
    return (
      <div>
        <MediaQuery maxWidth={768}>
          {matches => {
            return matches ? (
              !this.state.showingRooms ? (
                <Button
                  variant={"outlined"}
                  id="exit-sidebar"
                  onClick={() => this.showRoomList(true)}
                >
                  <Dashboard />
                </Button>
              ) : (
                <div className="roomSidenav">
                  <div id="room-top-bar">
                    <Button
                      id="chat-name"
                      onClick={() => this.showRoomList(false)}
                    >
                      ChatAt
                    </Button>
                    <Icon id="chat-icon" className="material-icons">
                      forum
                    </Icon>
                  </div>
                  <div id="roomlist">
                    {this.state.rooms.map(
                      room =>
                        !this.state.editMode ? (
                          <a
                            key={room.key}
                            onClick={() => this.props.handleClick(room)}
                            style={
                              this.props.activeRoom !== room
                                ? null
                                : selectedRoom
                            }
                          >
                            {room.name}
                          </a>
                        ) : (
                          <a
                            key={room.key}
                            onClick={() => this.deleteRoom(room.key)}
                            style={
                              room !== this.props.activeRoom
                                ? null
                                : selectedRoom
                            }
                          >
                            {room.name}
                            <DeleteIcon id="room-trash" />
                          </a>
                        )
                    )}
                  </div>
                  <Button
                    variant="flat"
                    id="del-room-btn"
                    onClick={() => this.toggleEdit()}
                  >
                    delete chat
                  </Button>
                  <form
                    ref="form"
                    id="room-btm-bar"
                    onSubmit={e => this.createRoom(e)}
                  >
                    <div id="newChat-dialog">start a new chat: </div>
                    <fieldset id="new-fieldset">
                      <legend />
                      <label htmlFor="room-name" />
                      <TextField
                        autoComplete="false"
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
                        <i id="newRoom-icon" className="material-icons">
                          meeting_room
                        </i>
                      </IconButton>
                    </fieldset>
                  </form>
                </div>
              )
            ) : (
              <div className="roomSidenav">
                <div id="room-top-bar">
                  <Button
                    id="chat-name"
                    onClick={() => this.showRoomList(false)}
                  >
                    ChatAt
                  </Button>
                  <Icon id="chat-icon" className="material-icons">
                    forum
                  </Icon>
                </div>
                <div id="roomlist">
                  {this.state.rooms.map(
                    room =>
                      !this.state.editMode ? (
                        <a
                          key={room.key}
                          onClick={() => this.props.handleClick(room)}
                          style={
                            this.props.activeRoom !== room ? null : selectedRoom
                          }
                        >
                          {room.name}
                        </a>
                      ) : (
                        <a
                          key={room.key}
                          onClick={() => this.deleteRoom(room.key)}
                          style={
                            room !== this.props.activeRoom ? null : selectedRoom
                          }
                        >
                          {room.name}
                          <DeleteIcon id="room-trash" />
                        </a>
                      )
                  )}
                </div>
                <Button
                  variant="flat"
                  id="del-room-btn"
                  onClick={() => this.toggleEdit()}
                >
                  delete chat
                </Button>
                <form
                  ref="form"
                  id="room-btm-bar"
                  onSubmit={e => this.createRoom(e)}
                >
                  <div id="newChat-dialog">start a new chat: </div>
                  <fieldset id="new-fieldset">
                    <legend />
                    <label htmlFor="room-name" />
                    <TextField
                      autoComplete="false"
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
                      <i id="newRoom-icon" className="material-icons">
                        meeting_room
                      </i>
                    </IconButton>
                  </fieldset>
                </form>
              </div>
            );
          }}
        </MediaQuery>
      </div>
    );
  }
}
export default RoomList;
