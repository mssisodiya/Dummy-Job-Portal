import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppliedJobs } from "../../actions/appliedjobs";
import { withdrawJob } from "../../actions/appliedjobs";
import getCurrentUser from "../auth";

function AppliedJobs(props) {
  const dispatch = useDispatch();
  const user = getCurrentUser;
  // const [applications, setApplications] = useState([]);
  const applications = useSelector((state) => state.jobapplied);

  useEffect(() => {
    dispatch(getAppliedJobs(props.match.params.id));
  }, [dispatch, props]);

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            {applications ? (
              <h4 className="fw-light">Jobs Applied By You</h4>
            ) : (
              <h4 className="fw-light">No applications </h4>
            )}
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {applications.length > 0
              ? applications.map((appl) => (
                  <div className="col" key={appl._id}>
                    <div
                      className="card shadow-sm"
                      style={{
                        borderColor:
                          appl.status === "Rejected" ? "red" : "green",
                      }}
                    >
                      <img
                        src={appl.jobId.employer.logo}
                        className="card-img-top"
                        alt="..."
                      />

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
                          <ul>
                            <li>Name - {appl.name}</li>
                            <li>Company - {appl.jobId.employer.company}</li>
                            <li>Position - {appl.jobId.title}</li>
                          </ul>
                        </div>
                        <p>
                          <small>{appl.status}</small>
                        </p>
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
