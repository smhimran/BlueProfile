import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
      <div className="header">
        <Link className="logo" to="/">
          Blue Profile
        </Link>
        <div className="accounts">
          <Link to="login">Login</Link>|<Link to="signup">Register</Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
