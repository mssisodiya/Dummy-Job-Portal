import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppliedJobs } from "../../actions/appliedjobs";
import { withdrawJob } from "../../actions/appliedjobs";

function AppliedJobs(props) {
  const dispatch = useDispatch();
  // const [applications, setApplications] = useState([]);
  const applications = useSelector((state) => state.jobapplied);

  useEffect(() => {
    dispatch(getAppliedJobs(props.match.params.id));
  }, [dispatch, props]);

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto"></div>
        </div>
        {applications ? (
          <h4 className="fw-light">Jobs Applied By You</h4>
        ) : (
          <h4 className="fw-light">No applications </h4>
        )}
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {applications.length > 0
              ? applications.map((appl) => (
                  <div className="col" key={appl._id}>
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
                          Profile
                        </text>
                      </svg>

                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              onClick={() => dispatch(withdrawJob(appl._id))}
                              className="btn btn-sm btn-danger"
                            >
                              withdraw
                            </button>
                          </div>
                          <p>{appl.name}</p>
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

export default AppliedJobs;
