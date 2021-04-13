import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_pasword, setCconfirm_pasword] = useState("");
  const [malert, setAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" && password === confirm_pasword) {
      setAlert(false);
      setErrorAlert(false);
      setSuccessAlert(false);
      setErrorMessage("");
      const user = {
        name,
        email,
        vjudgeID: handle,
        password,
      };
      axios
        .post("/api/user/signup", user)
        .then((res) => {
          if (res.status === 201) {
            setSuccessAlert(true);
          }
        })
        .catch((error) => {
          setErrorAlert(true);
          setErrorMessage(error.response.data.message || "Registrtion failed!");
        });
    } else if (password !== "") {
      setAlert(true);
    }
  };

  return (
    <div>
      <div className="main">
        <h5
          style={{
            borderBottom: "1px solid lightgrey",
            paddingBottom: "15px",
            color: "blue",
          }}>
          Register into Blue Profile
        </h5>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
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
            <label htmlFor="handle">Vjudge Handle</label>
            <input
              type="text"
              className="form-control"
              id="handle"
              aria-describedby="emailHelp"
              placeholder="Vjudge Handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
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
          <div className="form-group mb-3">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmpass"
              placeholder="Confirm Password"
              value={confirm_pasword}
              onChange={(e) => setCconfirm_pasword(e.target.value)}
              required
            />
          </div>
          {malert && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert">
              Passwords didn't match!
            </div>
          )}

          {successAlert && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert">
              Registration Successful!
            </div>
          )}

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

export default Signup;
