import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnApplication } from "../../actions/employer";

function ViewAppl(props) {
  const [appl, setAppl] = useState([]);
  const [jobPost, setJobPost] = useState([]);
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getAnApplication(id)).then((res) =>
      setAppl(res.application, setJobPost(res.jobPost[0]))
    );
  }, [dispatch, id]);

  return (
    <div className="mb-3">
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">Applicant details</div>
        <div className="card-body">
          <h4 className="card-title">Name - {appl.name}</h4>
          <h5>Email - {appl.email}</h5>
          <h5>Phone - {appl.phone}</h5>
          <h5>Qualification - {appl.qualification}</h5>
          <h5>Post applied for - {jobPost.title}</h5>
        </div>
      </div>
    </div>
  );
}
export default ViewAppl;
