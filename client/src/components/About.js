import React from "react";

function About() {
  return (
    <div>
      <h3 className="my-5" style={{ color: "#0d6efd", textAlign: "center" }}>
        Developed By
      </h3>
      <div className="container">
        <div className="card-group">
          <div className="card shadow">
            <img
              className="card-img-top img-fluid"
              width="100%"
              src="https://i.ibb.co/9pRJbxg/mim.jpg"
              alt="Kaniz Fatima Mim"
            />
            <div className="card-body">
              <h4 className="card-title">Kaniz Fatima Mim</h4>
              <p className="card-text">
                <h5 className="text-muted">
                  Department of Computer Science and Engineering
                </h5>
                <h6 className="text-muted">
                  Daffodil International University
                </h6>
              </p>
            </div>
          </div>
          <div className="card shadow">
            <img
              className="card-img-top img-fluid"
              src="https://i.ibb.co/vJvcf7d/tdp.jpg"
              alt="Shah Habibul Imran"
            />
            <div className="card-body">
              <h4 className="card-title">Shah Habibul Imran</h4>
              <p className="card-text">
                <h5 className="text-muted">
                  Department of Computer Science and Engineering
                </h5>
                <h6 className="text-muted">
                  Daffodil International University
                </h6>
              </p>
            </div>
          </div>
          <div className="card shadow">
            <img
              className="card-img-top img-fluid"
              src="https://i.ibb.co/g4J82Qw/takku.jpg"
              alt="Erfanul Islam Bhuiyan"
            />
            <div className="card-body">
              <h4 className="card-title">Erfanul Islam Bhuiyan</h4>
              <p className="card-text">
                <h5 className="text-muted">
                  Department of Computer Science and Engineering
                </h5>
                <h6 className="text-muted">
                  Daffodil International University
                </h6>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
