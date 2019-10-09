import React from "react";
import { withRouter } from "react-router";
import request from "superagent";

import Users from "./Users";
import url from "../constants";

class Rooms extends React.Component {
  state = {
    users: null
  };

  componentDidMount = () => {
    request
      .get(`${url}/users`)
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
      .post(`${url}/users`)
      .send({ name: user.nickname, picture: user.picture })
      .then(res => {
        this.props.history.push(`/chat/${res.body.id}`);
      })
      .catch(console.error);
  };

  render() {
    return (
      <div className="create-room-div">
        <div className="create-btn-div">
          <button className="create-room-btn" onClick={this.onClick}>
            Create your room
          </button>
        </div>
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default withRouter(Rooms);
