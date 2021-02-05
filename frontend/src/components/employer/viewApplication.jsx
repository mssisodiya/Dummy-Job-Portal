import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAnApplication, acceptApplication } from "../../actions/employer";

function ViewAppl(props) {
  const [appl, setAppl] = useState([]);
  const [jobPost, setJobPost] = useState([]);

  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getAnApplication(id)).then((res) =>
      setAppl(res.application[0], setJobPost(res.jobPost))
    );
  }, [dispatch, id]);

  const acceptAppl = () => {
    dispatch(
      acceptApplication({
        applicantId: appl._id,
        name: appl.name,
        post: jobPost.title,
        email: appl.email,
        phone: appl.phone,
        qualification: appl.qualification,
        jobseekerId: appl.jobseekerId,
        jobId: appl.jobId,
        resume: appl.resume,
        employerId: appl.employerId,
      })
    )
      .then((res) => toast.success("Mail sent to applicant"))
      .catch((e) => {
        toast.error(e.response.data);
      });
  };

  return (
    <div className="mb-3">
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
        <button className="btn btn-md btn-primary" onClick={acceptAppl}>
          Accept
        </button>
        <button className="btn btn-md btn-danger">Reject</button>
      </div>
    </div>
  );
}
export default ViewAppl;
