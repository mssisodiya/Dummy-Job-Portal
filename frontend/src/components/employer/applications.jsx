import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import getCurrentUser from "../auth";
import { getApplications } from "../../actions/employer";
import { toast } from "react-toastify";

function Applications() {
  const dispatch = useDispatch();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    dispatch(getApplications(user._id))
      .then((res) => setApplications(res))
      .catch((e) => {
        toast.error(e.response.data);
      });
  }, [dispatch]);

  return (
    <div>
      <section className="py-5 text-center container">
        {console.log("apploications", applications)}
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto"></div>
        </div>
        {applications ? (
          <h4 className="fw-light">Applications Recieved</h4>
        ) : (
          <h4 className="fw-light">No applications recieved </h4>
        )}
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {applications.map((appl) => (
              <div className="col" key={appl._id}>
                <div
                  className="card shadow-sm"
                  style={{
                    borderColor: appl.status === "Rejected" ? "red" : "green",
                  }}
                >
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
                      Profile
                    </text>
                  </svg>

                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <NavLink
                          to={`/viewapplication/${appl._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </NavLink>
                      </div>
                      <ul>
                        <li>Name - {appl.name}</li>
                        <li>Post Applied For - {appl.jobId.title}</li>
                        <li>Qualification - {appl.qualification}</li>
                      </ul>
                    </div>
                    <p>
                      <small>{appl.status}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applications;
