import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAJob, editJob } from "../../actions/jobPost";

function EditJob(props) {
  const dispatch = useDispatch();
  const [newJob, setJob] = useState({
    title: "",
    jobtype: "",
    qualification: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    dispatch(getAJob(props.match.params.id)).then((res) => setJob(res));
  }, [dispatch]);

  function handleChange({ currentTarget: input }) {
    const data = { ...newJob };
    data[input.name] = input.value;
    setJob(data);
  }
  const handleSubmit = async () => {
    dispatch(editJob(newJob)).then((res) => props.history.push("/ehome"));
  };

  return (
    <div id="registerform">
      <h3>Edit a job</h3>
      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter full Name"
          name="title"
          value={newJob.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Job type</label>
        <select
          className="custom-select my-1 mr-sm-2"
          id="jobtype"
          name="jobtype"
          onChange={handleChange}
          value={newJob.jobtype}
        >
          <option>Choose...</option>
          <option value="Part Time">Part Time</option>
          <option value="Full Time">Full Time</option>
        </select>
      </div>
      <div className="form-group">
        <label>Qualification</label>
        <select
          className="custom-select my-1 mr-sm-2"
          id="qualification"
          name="qualification"
          onChange={handleChange}
          value={newJob.qualification}
        >
          <option>Choose...</option>
          <option value="BE/BTECH">BE/BTECH</option>
          <option value="MCA">MCA</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          name="location"
          value={newJob.location}
          placeholder="Enter Location"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>salary</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Max salary in lacs"
          name="salary"
          value={newJob.salary}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={() => handleSubmit()}
        className="btn btn-primary btn-block"
      >
        Post
      </button>
    </div>
  );
}

export default EditJob;
