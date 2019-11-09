import React from "react";
import { withRouter } from "react-router";
import request from "superagent";
import url from "../constants";

class Users extends React.Component {
  onClick = userId => {
    request
      .delete(`${url}/users/${userId}`)
      .then(res => console.log(res))
      .catch(console.error);

    this.props.history.push(`/chat/${userId}`);
  };

  render() {
    return (
      <div className="users-divs">
        <h1 className="join-room">Join existing room</h1>
        <div className="rooms">
          {this.props.users
            ? this.props.users.map(user => (
                <div className="user-div" onClick={() => this.onClick(user.id)}>
                  <div className="div-user-picture">
                    <img
                      className="user-picture"
                      src={user.picture}
                      alt={user.picture}
                    />
                  </div>
                  <div className="div-user-name">
                    <p className="user-name">{user.name}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
export default withRouter(Users);
