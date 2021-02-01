import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { getJobseeker } from "../../actions/jobSeeker";
import { getAllJob } from "../../actions/jobPost";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function JHome() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    jobSeeker: [],
  });
  const [jobPost, setJob] = useState({
    jobPost: [],
  });

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(getJobseeker(user._id)).then((res) => setUser(res[0]));
    dispatch(getAllJob()).then((res) => setJob(res));
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   dispatch(deleteJob(id)).then((res) => console.log("res", res));
  //   dispatch(getEmployer(user._id)).then((res) => setJob(res.jobs));
  // };
  return (
    <div>
      <section className="py-5 text-center container">
        <div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <NavLink
              className="btn btn-primary me-md-2"
              to={`/appliedJobs/${user._id}`}
            >
              Applied By you
            </NavLink>
          </div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Welcome {user.name}</h1>
          </div>
        </div>
        <h4 className="fw-light">All Jobs</h4>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {jobPost.length > 0
              ? jobPost.map((job) => (
                  <div className="col" key={job._id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src={job.employer.logo}
                        className="card-img-top"
                        alt="..."
                      />
                    </div>

                    <div className="card-body">
                      <p className="card-text">{job.title}</p>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          company - {job.employer.company}
                        </li>
                        <li className="list-group-item">
                          Salary - {job.salary} lpa
                        </li>
                        <li className="list-group-item">
                          Qualification Required - {job.qualification}
                        </li>
                        <li className="list-group-item">
                          Location - {job.location}
                        </li>
                      </ul>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group" employer={job.employer}>
                          <Link
                            to={`apply/${job._id}`}
                            className="btn btn-sm btn-primary"
                          >
                            Apply
                          </Link>
                          <div className="align-left"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JHome;
