import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import getCurrentUser from "../auth";
import { getApplications } from "../../actions/employer";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { getAnApplication, changestatus } from "../../actions/employer";

function Applications(props) {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.employer);
  const [temp, setTemp] = useState([]);
  const [show, setShow] = useState(false);
  const [applicant, setAppl] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (i) => {
    console.log("indexdata", applications);
    const d = [...applications];
    setAppl(d[i]);
    setShow(true);
    console.log("setAppl", applicant);
  };

  const changeAppSts = (choice) => {
    console.log("choice", choice);
    dispatch(
      changestatus({
        jobId: choice.appl.jobId._id,
        company: choice.appl.jobId.employer.company,
        post: choice.appl.jobId.title,
        status: choice.choice,
      })
    )
      .then((res) => {
        setTemp(choice.choice);
        toast.success("Mail sent to applicant");
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
  };

  useEffect(() => {
    const user = getCurrentUser();
    dispatch(getApplications(user._id));
  }, [applications]);

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-1">
          <div className="col-lg-6 col-md-8 mx-auto"></div>
        </div>
        {applications ? (
          <h4 className="fw-light">Applications Recieved</h4>
        ) : (
          <h4 className="fw-light">No applications recieved </h4>
        )}
      </section>
      <div className="album py-1 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {applications.map((appl, index) => (
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
                        <Button
                          variant="primary"
                          onClick={() => handleShow(index)}
                        >
                          view
                        </Button>
                      </div>
                      <ul>
                        <li>
                          <b>Name - </b>
                          {appl.name}
                        </li>
                        <li>
                          <b>Post Applied For - </b>
                          {appl.jobId.title}
                        </li>
                        <li>
                          <b>Qualification - </b>
                          {appl.qualification}
                        </li>
                      </ul>
                    </div>
                    <p>
                      <small>{appl.status}</small>
                    </p>
                  </div>
                  <Modal show={show} onHide={handleClose} size="md">
                    <Modal.Header closeButton>
                      <Modal.Title>Applicant Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {applicant && (
                        <ul>
                          <li>
                            <b>Name -</b> {applicant.name}
                          </li>
                          <li>
                            <b>Email -</b> {applicant.email}
                          </li>
                          <li>
                            <b>Phone -</b> {applicant.phone}
                          </li>
                          <li>
                            <b>Qualification -</b> {applicant.qualification}
                          </li>
                          <li>
                            <b>Post applied for -</b> {applicant.jobId.title}
                          </li>

                          <a
                            className="btn btn-primary btn-sm"
                            href={appl.resume}
                          >
                            View Resume
                          </a>
                        </ul>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <div className="text-center">
                        {applicant.status === "Pending" && (
                          <div>
                            {console.log("applicant", applicant)}

                            <p>Status is pending</p>

                            <button
                              className="btn btn-md btn-danger"
                              onClick={() =>
                                changeAppSts({
                                  choice: "Rejected",
                                  appl: applicant,
                                })
                              }
                            >
                              Reject
                            </button>

                            <button
                              className="btn btn-md btn-success"
                              onClick={() =>
                                changeAppSts({
                                  choice: "Accepted",
                                  appl: applicant,
                                })
                              }
                            >
                              Accept
                            </button>
                          </div>
                        )}

                        {applicant.status === "Accepted" && (
                          <button
                            className="btn btn-md btn-danger"
                            onClick={() =>
                              changeAppSts({
                                choice: "Rejected",
                                appl: applicant,
                              })
                            }
                          >
                            Reject
                          </button>
                        )}

                        {applicant.status === "Rejected" && (
                          <button
                            className="btn btn-md btn-success"
                            onClick={() =>
                              changeAppSts({
                                choice: "Accepted",
                                appl: applicant,
                              })
                            }
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    </Modal.Footer>
                  </Modal>
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
