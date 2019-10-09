import React from "react";
import Rooms from "./Rooms";

import { useAuth0 } from "../react-auth0-spa";

const RoomsContainer = () => {
  const { user } = useAuth0();
  const f = useAuth0();

  const getIdToken = async () => {
    const id = await f.getIdTokenClaims();
    return id;
  };

  getIdToken();
  return <Rooms user={user} />;
};

export default RoomsContainer;
