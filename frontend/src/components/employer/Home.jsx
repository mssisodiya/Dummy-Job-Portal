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
        <div className="row py-lg-1">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div>
              <img
                src={user.logo}
                className=""
                alt="..."
                style={{ width: "13rem" }}
              />

              <h1 className="fw-light">Welcome {user.name}</h1>
            </div>
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
                      <div
                        className="card-body"
                        style={{ borderColor: "black" }}
                      >
                        <img
                          src={user.logo}
                          className="card-img-top"
                          alt="..."
                          style={{ height: "15rem" }}
                        />

                        <p className="card-text">
                          <b>Post - </b>
                          {job.title}
                        </p>
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
