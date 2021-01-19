import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../../actions/jobPost";

function JobPost(props) {
  console.log("props", props);
  const dispatch = useDispatch();
  const [newJob, setJob] = useState({
    title: "",
    jobtype: "",
    qualification: "",
    location: "",
    salary: "",
    id: props.match.params.id,
  });

  function handleChange({ currentTarget: input }) {
    const data = { ...newJob };
    data[input.name] = input.value;
    setJob(data);
  }
  const handleSubmit = () => {
    dispatch(addJob(newJob));
    props.history.push("/ehome");
  };

  return (
    <div id="registerform">
      <h3>Post a job</h3>
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
        >
          <option selected>Choose...</option>
          <option value="1">Part Time</option>
          <option value="2">Full Time</option>
        </select>
      </div>
      <div className="form-group">
        <label>Qualification</label>
        <select
          className="custom-select my-1 mr-sm-2"
          id="qualification"
          name="qualification"
          onChange={handleChange}
        >
          <option selected>Choose...</option>
          <option value="1">BE/BTECH</option>
          <option value="2">MCA</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          name="location"
          value={newJob.Location}
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

export default JobPost;
