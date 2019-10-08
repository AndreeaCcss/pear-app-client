import React from "react";
import { Container, Row, Col } from "reactstrap";
import Peer from "simple-peer";
import io from "socket.io-client";
import { withRouter } from "react-router";
import Users from "./Users";
import request from "superagent";

class Rooms extends React.Component {
  state = {
    users: null
  };

  componentDidMount = () => {
    request
      // .get("http://localhost:4000/users")
      .get("https://vast-beach-23446.herokuapp.com")
      .then(response => {
        return this.setState({
          users: response.body
        });
      })
      .catch(console.error);
  };

  onClick = () => {
    const user = this.props.user;
    request
      // .post("http://localhost:4000/users")
      .post("https://vast-beach-23446.herokuapp.com")
      .send({ name: user.nickname, picture: user.picture })
      .then(res => console.log(res))
      .catch(console.error);

    const pathParam = user.nickname.split(".").join("");
    this.props.history.push(`/chat/${pathParam}`);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Join room</button>
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default withRouter(Rooms);
