import React from "react";

function About() {
  return (
    <div>
      <h3 className="my-5 mb-3" style={{ color: "#0d6efd", textAlign: "center" }}>
        Motivation
      </h3>
      <div className="card shadow w-95">
        <div className="card-body">
          <p className="card-text" style={{fontWeight: "bold"}}>
            <p>Generally, every Programmer needs a guideline to follow and practice to grow properly. Without guidelines most of the programmers get distracted. So Blue sheet is such a sheet that contains problems that decides the necessary guidelines. Here problems are sorted in such a way that beginners will start and continue practicing and slowly they will become greater programming assets.</p> <br></br>
	
	          <p>The Blue sheet is created for DIU ACM members. Normally users have to write "OK" manually after solving a problem from the sheet. This process is too old now and not suitable for a large number of users.</p><br></br>

	          <p>So we wanted to make this "Blue profile" site so that users don't have to track the original sheet manually. It will update automatically when any user will solve a problem. Users can view their total solve count, solve list also their standings among other Blue Solvers. The site will update automatically every hour. So the whole process is quite easy to use and can be easily maintained. Currently, the site is receiving all the data from "VJudge" as all blue problems are available in VJudge.</p><br></br>   </p>

        </div>
      </div>
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
    </div >
  );
}

export default About;
