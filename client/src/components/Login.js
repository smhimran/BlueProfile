import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Redirect } from "react-router";
import jwt from "jsonwebtoken";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let isAuthenticated = props.isLoggedIn;

  const handlSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    axios
      .post("/api/user/login", user)
      .then((res) => {
        const token = res.data.token;
        if (token) {
          Cookies.set("token", token, { expires: 1 / 48 });
          let decoded = jwt.decode(token);
          let user = decoded.vjudgeID;
          props.handleStateChange(true, user);
        }
      })
      .catch((error) => {
        setErrorAlert(true);
        setErrorMessage(error.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <div className="main">
          <h5
            style={{
              borderBottom: "1px solid lightgrey",
              paddingBottom: "15px",
              color: "blue",
            }}>
            Login to Blue Profile
          </h5>
          <form className="form-inline" onSubmit={handlSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">
                Email address <span style={{ color: "#e32" }}>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">
                Password <span style={{ color: "#e32" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorAlert && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
