import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployer } from "../../actions/employer";
import { NavLink } from "react-router-dom";
import { deleteJob, getJob } from "../../actions/jobPost";
import getCurrentUser from "../auth";

function EHome() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    employer: [],
  });

  const jobPost = useSelector((state) => state.jobpost);

  useEffect(() => {
    const user = getCurrentUser();
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(getEmployer(user._id)).then((res) => setUser(res.employer[0]));
    dispatch(getJob(user._id));
  }, [dispatch]);

  const handleDelete = async (job) => {
    dispatch(deleteJob(job._id));
  };
  return (
    <div>
      <section className="py-5 text-center container">
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <NavLink
            className="btn btn-primary me-md-2"
            to={`/new/jobpost/${user._id}`}
          >
            Post a Job
          </NavLink>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <NavLink
            className="btn btn-primary me-md-2"
            to={`/applications/${user._id}`}
          >
            Applications Recieved
          </NavLink>
        </div>

        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Welcome {user.name}</h1>
          </div>
        </div>
        {jobPost ? (
          <h4 className="fw-light">Jobs posted by you </h4>
        ) : (
          <h4 className="fw-light">No Jobs posted by you </h4>
        )}
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {jobPost
              ? jobPost.map((job) => (
                  <div className="col" key={job._id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <img src={user.logo} className="card-img-top" alt="..." />

                      <div className="card-body">
                        <p className="card-text">{job.title}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <NavLink
                              to={`/editjob/${job._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Edit
                            </NavLink>
                          </div>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(job)}
                          >
                            Delete
                          </button>
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
