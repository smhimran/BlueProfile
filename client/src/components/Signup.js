import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [institute, setInstitute] = useState("");
  const [varsityID, setVarsityID] = useState("");
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
        institute,
        varsityID,
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
          setErrorMessage(
            error.response.data.message || "Registration failed!"
          );
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
          Register
        </h5>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">
              Name <span style={{ color: "#e32" }}>*</span>
            </label>
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
            <label htmlFor="handle">
              Vjudge Handle <span style={{ color: "#e32" }}>*</span>
            </label>
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
            <label htmlFor="institute">Institute</label>
            <input
              type="text"
              className="form-control"
              id="institute"
              aria-describedby="emailHelp"
              placeholder="Institute name"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="instituteID">Institute ID</label>
            <input
              type="text"
              className="form-control"
              id="instituteID"
              aria-describedby="emailHelp"
              placeholder="Institute ID"
              value={varsityID}
              onChange={(e) => setVarsityID(e.target.value)}
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
          <div className="form-group mb-3">
            <label htmlFor="confirmpass">
              Confirm Password <span style={{ color: "#e32" }}>*</span>
            </label>
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
