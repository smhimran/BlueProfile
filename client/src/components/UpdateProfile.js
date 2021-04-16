import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";

function UpdateProfile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [institute, setInstitute] = useState("");
  const [varsityID, setVarsityID] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = jwt.decode(token);

    setUserHandle(decoded.vjudgeID);
    const current = decoded.vjudgeID;

    axios
      .get(`/api/user/${current}`)
      .then((res) => {
        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setHandle(user.vjudgeID);
        setInstitute(user.institute);
        setVarsityID(user.varsityID);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    // e.preventDefault();

    const user = {
      name,
      email,
      institute: institute,
      varsityID: varsityID,
      vjudgeID: handle,
    };

    const token = Cookies.get("token");

    axios
      .patch(`/api/user/${userHandle}`, user, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setSuccessAlert(true);
        console.log("Updated");
        if (handle != userHandle) {
          Cookies.remove("token");
          props.handleStateChange(false, null);
          setAuthenticated(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        setErrorAlert(true);
        console.log(error);
        setErrorMessage("Update failed!");
        // window.location.reload();
      });
  };

  if (authenticated) {
    return (
      <div>
        <div className="main">
          <h5
            style={{
              borderBottom: "1px solid lightgrey",
              paddingBottom: "15px",
              color: "blue",
            }}>
            Update Profile
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
              <label htmlFor="handle">Institute</label>
              <input
                type="text"
                className="form-control"
                id="handle"
                aria-describedby="emailHelp"
                placeholder="Institute name"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="handle">Institute ID</label>
              <input
                type="text"
                className="form-control"
                id="handle"
                aria-describedby="emailHelp"
                placeholder="Institute ID"
                value={varsityID}
                onChange={(e) => setVarsityID(e.target.value)}
              />
            </div>

            {/* {successAlert && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert">
                Update Successful!
              </div>
            )} */}

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
  } else {
    return <Redirect to="/login" />;
  }
}

export default UpdateProfile;
