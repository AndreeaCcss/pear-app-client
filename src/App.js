import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import initFontAwesome from "./utils/initFontAwesome";
import ChatContainer from "./views/ChatContainer";
import RoomsContainer from "./views/RoomsContainer";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import "./App.css";

initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/chat/:id" component={ChatContainer} />
          <Container className="flex-grow-1 mt-5">
            <PrivateRoute path="/join-chat" component={RoomsContainer} />
          </Container>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
