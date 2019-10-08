import React from "react";
import { withRouter } from "react-router";

class Users extends React.Component {
  onClick = pathParam => {
    this.props.history.push(`/chat/${pathParam}`);
  };

  render() {
    return (
      <div>
        {this.props.users
          ? this.props.users.map(user => (
              <div onClick={() => this.onClick(user.id)}>
                <p>
                  {user.name} - {user.id}
                </p>
                <img className="user" src={user.picture} alt={user.picture} />
              </div>
            ))
          : null}
      </div>
    );
  }
}
export default withRouter(Users);
