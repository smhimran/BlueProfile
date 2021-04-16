import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header(props) {
  let isAuthenticated = props.isLoggedIn;

  const handleLogout = () => {
    Cookies.remove("token");
    props.handleStateChange(false, null);
  };

  return (
    <div>
      <div className="header">
        <Link className="logo" to="/">
          Blue Profile
        </Link>
        <div className="accounts mb-2">
          {!isAuthenticated ? (
            <span>
              <Link className="btn btn-outline-success" to="/login">
                <span>
                  <i className="fa fa-sign-in"></i>
                </span>{" "}
                Login
              </Link>{" "}
              <Link className="btn btn-outline-primary" to="/signup">
                <span>
                  <i className="fa fa-user-plus"></i>
                </span>{" "}
                Register
              </Link>
            </span>
          ) : (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}>
              <span>
                <i className="fa fa-sign-out"></i>
              </span>{" "}
              Logout
            </button>
          )}
        </div>
      </div>
      <Navbar isLoggedIn={props.isLoggedIn} user={props.user} />
    </div>
  );
}

export default Header;
