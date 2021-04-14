import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/standings")
      .then((result) => {
        setStandings(result.data.standings);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="standinglist">
        <h3 className="my-5" style={{ color: "#0d6efd", textAlign: "center" }}>
          Standings
        </h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Who</th>
              <th scope="col">Vjudge Handle</th>
              <th scope="col">Solve count</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((person, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={`/user/${person.vjudgeID}`} style={{textDecoration: 'none'}}>{person.name}</Link>
                  </td>
                  <td>
                    <a
                      style={{textDecoration: 'none'}}
                      target="blank"
                      href={`https://vjudge.net/user/${person.vjudgeID}`}>
                      {person.vjudgeID}
                    </a>
                  </td>
                  <td className="cnt">{person.solveCount}</td>
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

export default Home;
