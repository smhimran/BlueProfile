import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const [solves, setsSolves] = useState([]);
  const { handle } = useParams();

  useEffect(() => {
    axios
      .get(`/api/user/${handle}`)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setsSolves(res.data.solves);
        }

        console.log(user);
      })
      .catch((error) => console.log(error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="info" style={{ position: "relative" }}>
        {/* <img
          src="https://userpic.codeforces.org/874704/title/46a73748a1ca9f41.jpg"
          alt="User"
        /> */}
        <div className="main-info " style={{ marginBottom: "20px" }}>
          <h1>
            <Link
              to={`/user/${handle}`}
              style={{ textDecoration: "none", color: "gray" }}>
              {user.name}
            </Link>
          </h1>
        </div>
        <ul>
          <li>
            <i className="fa fa-user icon"></i>
            {handle}
          </li>
          <li>
            <i className="fa fa-edit icon"></i>
            <Link to="/">Edit profile</Link>
          </li>
          <li id="myScrollspy">
            <i className="fa fa-flag icon"></i>
            <a href="#solve">Solve count</a>
          </li>
        </ul>
      </div>
      <div className="solvelist" id="solve">
        <h3 className="my-5" style={{ color: "blue", textAlign: "center" }}>
          Solved Problems
        </h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">OJ</th>
              <th scope="col">Problem ID</th>
              <th scope="col">Problem Name</th>
            </tr>
          </thead>
          <tbody>
            {solves.map((problem, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{problem.judge}</th>
                  <td>{problem.problemID}</td>
                  <td>{problem.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav aria-label="...">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="/"
                tabIndex="-1"
                aria-disabled="true">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="/">
                1
              </a>
            </li>
            <li className="page-item " aria-current="page">
              <a className="page-link" href="/">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Profile;
