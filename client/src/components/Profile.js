import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Name from "./Name";

function Profile(props) {
  const [user, setUser] = useState({});
  const [solves, setsSolves] = useState([]);
  const { handle } = useParams();

  let isLoggedIn = props.isLoggedIn;

  useEffect(() => {
    axios
      .get(`/api/user/${handle}`)
      .then((res) => {
        setUser(res.data);
        setsSolves(res.data.solves);
      })
      .catch((error) => console.log(error));
  }, [handle]);

  return (
    <div>
      <div className="info" style={{ position: "relative" }}>
        <img
          src="https://i.ibb.co/mCqYDZY/152-1520367-user-profile-default-image-png-clipart-png-download.png"
          alt="User"
        />
        <div className="main-info " style={{ marginBottom: "20px" }}>
          <Name name={user.name} handle={handle} />
        </div>
        <ul>
          <li>
            <i className="fa fa-user icon"></i>
            {handle}
          </li>
          {isLoggedIn && props.user === handle && (
            <li>
              <i className="fa fa-edit icon"></i>
              <Link to="/">Edit profile</Link>
            </li>
          )}
          <li id="myScrollspy">
            <i className="fa fa-flag icon"></i>
            <a style={{ textDecoration: "none" }} href="#solve">
              Problems Solved
            </a>
            : {solves.length}
          </li>
        </ul>
      </div>
      <div className="solvelist" id="solve">
        <h3 className="my-5" style={{ color: "#0d6efd", textAlign: "center" }}>
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
                  <td><a style={{textDecoration: 'none'}} target="blank" href={`https://vjudge.net/problem/${problem.judge}-${problem.problemID}`}>
                  {problem.problemID}
                    </a></td>
                  <td><a style={{textDecoration: 'none'}} target="blank" href={`https://vjudge.net/problem/${problem.judge}-${problem.problemID}`}>
                  {problem.title}
                    </a></td>
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
