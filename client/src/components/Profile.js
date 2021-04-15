import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Name from "./Name";

function Profile(props) {
  const [user, setUser] = useState({});
  const [solves, setSolves] = useState([]);
  const [problems, setProblems] = useState([]);
  const { handle } = useParams();

  let isLoggedIn = props.isLoggedIn;

  useEffect(() => {
    axios
      .get("/api/problems")
      .then((result) => {
        let problemList = result.data;
        setProblems(problemList);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/api/user/${handle}`)
      .then((res) => {
        setUser(res.data);
        let solve = res.data.solves;
        let updatedProblems = [];

        for (let i = 0; i < solve.length; i++) {
          let identifier = solve[i].judge + " " + solve[i].problemID;

          updatedProblems.push(identifier);
        }

        setSolves(updatedProblems);
      })
      .catch((error) => console.log(error));

    console.log(solves);
    // eslint-disable-next-line
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
            <a
              style={{ textDecoration: "none" }}
              href={`https://vjudge.net/user/${handle}`}>
              <strong>
                <i className="fa fa-user icon"></i>
                {handle}
              </strong>
            </a>
          </li>
          <li>
            <i className="fa fa-university icon"></i>
            <strong>Department: </strong>
            {user.department}
          </li>
          <li>
            <i className="fa fa-id-badge icon"></i>
            <strong>Varsity ID: </strong>
            {user.varsityID}
          </li>
          <li>
            <i className="fa fa-envelope icon"></i>
            <strong>Email: </strong>
            {user.email}
          </li>

          <li id="myScrollspy">
            <i className="fa fa-flag icon"></i>
            <a style={{ textDecoration: "none" }} href="#solve">
              Problems Solved
            </a>
            : <span className="cnt">{solves.length}</span>
          </li>
          {isLoggedIn && props.user === handle && (
            <li>
              <i className="fa fa-edit icon"></i>
              <Link to="/">Edit profile</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="solvelist table-responsive" id="solve">
        <h3 className="my-5" style={{ color: "#0d6efd", textAlign: "center" }}>
          Solved Problems
        </h3>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">OJ</th>
              <th scope="col">Problem ID</th>
              <th scope="col">Problem Name</th>
              <th scope="col" className="text-center">
                Solve Status
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{problem.judge}</th>
                  <td>
                    <a
                      style={{ textDecoration: "none" }}
                      target="blank"
                      href={`https://vjudge.net/problem/${problem.judge}-${problem.problemID}`}>
                      {problem.problemID}
                    </a>
                  </td>
                  <td>
                    <a
                      style={{ textDecoration: "none" }}
                      target="blank"
                      href={`https://vjudge.net/problem/${problem.judge}-${problem.problemID}`}>
                      {problem.title}
                    </a>
                  </td>
                  <td className="text-center">
                    {solves.includes(
                      problem.judge + " " + problem.problemID
                    ) ? (
                      <span className="cnt">
                        <i className="fa fa-check"></i>
                      </span>
                    ) : (
                      <span> </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <nav aria-label="...">
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
        </nav> */}
      </div>
    </div>
  );
}

export default Profile;
