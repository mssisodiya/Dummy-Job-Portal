import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addJob } from "../../actions/jobPost";
import getCurrentUser from "../auth";

function JobPost(props) {
  const dispatch = useDispatch();
  const user = getCurrentUser();
  const [newJob, setJob] = useState({
    title: "",
    jobtype: "",
    qualification: "",
    location: "",
    salary: "",
    id: user._id,
  });

  function handleChange({ currentTarget: input }) {
    const data = { ...newJob };
    data[input.name] = input.value;
    setJob(data);
  }
  const handleSubmit = async () => {
    const res = await dispatch(addJob(newJob))
      .then((res) => {
        props.history.push("/ehome");
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
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
