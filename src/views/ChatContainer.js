import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import Chat from "./Chat";

const ChatContainer = () => {
  const { loading, user, auth0 } = useAuth0();
  const f = useAuth0();
  if (loading || !user) {
    return <Loading />;
  }
  const getIdToken = async () => {
    const id = await f.getIdTokenClaims();
    console.log("user", id.__raw);
  };

  getIdToken();
  return <Chat user={user} loading={loading} />;
};
export default ChatContainer;
