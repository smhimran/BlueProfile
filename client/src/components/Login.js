import React from "react";

function Login() {
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
        <form className="form-inline">
          <div class="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
