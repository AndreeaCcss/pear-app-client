import React from "react";
import { Container, Row, Col } from "reactstrap";
import Peer from "simple-peer";
import io from "socket.io-client";
import Rooms from "./Rooms";

import { useAuth0 } from "../react-auth0-spa";

const RoomsContainer = () => {
  const { loading, user, auth0 } = useAuth0();
  const f = useAuth0();

  const getIdToken = async () => {
    const id = await f.getIdTokenClaims();
    console.log("user", id.__raw);
  };

  getIdToken();
  return <Rooms user={user} />;
};

export default RoomsContainer;
