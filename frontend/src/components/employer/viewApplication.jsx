import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAnApplication, changestatus } from "../../actions/employer";

function ViewAppl(props) {
  const [appl, setAppl] = useState([]);
  const [jobPost, setJobPost] = useState([]);
  const [isc, setIsc] = useState("");

  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getAnApplication(id)).then((res) =>
      setAppl(res.application[0], setJobPost(res.jobPost))
    );
  }, [dispatch, id]);

  const changeAppSts = (choice) => {
    // setStts(choice);
    dispatch(
      changestatus({
        jobId: appl.jobId,
        company: jobPost.employer.company,
        post: jobPost.title,

        status: choice,
      })
    )
      .then(
        (res) => toast.success("Mail sent to applicant"),
        props.history.push("/applications")
      )
      .catch((e) => {
        toast.error(e.response.data);
      });
  };

  return (
    <div className="mb-3">
      {console.log("appl", appl)}
      {console.log("jobpost", jobPost)}
      <div className="card text-white bg-dark mb-3 ml-4 mt-4 mr-3">
        <div className="card-header">Applicant details</div>
        <div className="card-body">
          <ul className="list-group list-group bg-dark">
            <li className="card-title">Name - {appl.name}</li>
            <li>Email - {appl.email}</li>
            <li>Phone - {appl.phone}</li>
            <li>Qualification - {appl.qualification}</li>
            <li>Post applied for - {jobPost.title}</li>
          </ul>

          <button className="button">
            <a className="button" href={appl.resume}>
              View Resume
            </a>
          </button>
        </div>
      </div>
      <div className="text-center">
        {appl.status === "Pending" && (
          <div>
            <p>Status is pending</p>

            <button
              className="btn btn-md btn-success"
              onClick={() => changeAppSts("Rejected")}
            >
              Reject
            </button>

            <button
              className="btn btn-md btn-danger"
              onClick={() => changeAppSts("Accepted")}
            >
              Accept
            </button>
          </div>
        )}

        {appl.status === "Accepted" && (
          <button
            className="btn btn-md btn-danger"
            onClick={() => changeAppSts("Rejected")}
          >
            Reject
          </button>
        )}

        {appl.status === "Rejected" && (
          <button
            className="btn btn-md btn-success"
            onClick={() => changeAppSts("Accepted")}
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
}
export default ViewAppl;
