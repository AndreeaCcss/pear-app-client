import React from "react";

import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import Chat from "./Chat";

const ChatContainer = () => {
  const { loading, user } = useAuth0();
  const f = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }
  const getIdToken = async () => {
    const id = await f.getIdTokenClaims();
    return id;
  };
  getIdToken();

  return <Chat user={user} loading={loading} />;
};
export default ChatContainer;
