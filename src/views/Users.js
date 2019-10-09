import React from "react";
import { withRouter } from "react-router";

class Users extends React.Component {
  onClick = pathParam => {
    this.props.history.push(`/chat/${pathParam}`);
  };

  render() {
    return (
      <div>
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
