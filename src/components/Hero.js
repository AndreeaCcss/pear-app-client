import React from "react";
import pear from "../assets/Pear.png";
import { Link } from "react-router-dom";

const Hero = () => (
  <div className="text-center hero my-5">
    <Link to="/">
      <img className="pear-logo-pear" src={pear} alt="app logo" width="120" />
    </Link>
  </div>
);

export default Hero;
