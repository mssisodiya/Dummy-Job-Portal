import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { getEmployer } from "../../actions/employer";
import { NavLink } from "react-router-dom";

function EHome() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    employer: [],
  });
  const [jobPost, setJob] = useState({
    jobPost: [],
  });

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(getEmployer(user._id)).then((res) =>
      setUser(res.employer[0], setJob(res.jobs))
    );
  }, [dispatch]);

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <NavLink
            className="btn btn-primary me-md-2"
            to={`/new/jobpost/${user._id}`}
          >
            Post a Job
          </NavLink>
        </div>
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Welcome {user.name}</h1>
          </div>
        </div>
        <h4 className="fw-light">Jobs posted by you </h4>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {jobPost.length > 0
              ? jobPost.map((job) => (
                  <div className="col" key={job._id}>
                    <div className="card shadow-sm">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c" />
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                          Thumbnail
                        </text>
                      </svg>

                      <div className="card-body">
                        <p className="card-text">{job.title}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <NavLink
                              to={`/editjob/${job._id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Edit
                            </NavLink>
                          </div>
                          <small className="text-muted">9 mins</small>
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

export default EHome;
