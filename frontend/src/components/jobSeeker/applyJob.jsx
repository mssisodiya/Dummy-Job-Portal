import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAJob } from "../../actions/jobPost";
import { applyJob } from "../../actions/appliedjobs";
import { getJobseeker } from "../../actions/jobSeeker";
import { toast } from "react-toastify";

function ApplyJob(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [employer, setEmployer] = useState([]);
  const [err, setErr] = useState(false);

  // const js = useSelector((state) => state.jobseeker);
  const [js, setJs] = useState([]);

  const [newJob, setJob] = useState({});

  useEffect(() => {
    // dispatch(getJobseeker(user._id)).then((res) => setTemp(res[0]));
    dispatch(getAJob(props.match.params.id)).then((res) =>
      setEmployer(res.employer)
    );
    dispatch(getJobseeker(user._id)).then((res) => setJob(res[0]));
  }, [dispatch]);

  function handleChange({ currentTarget: input }) {
    const data = { ...newJob };
    data[input.name] = input.value;
    data["employerId"] = employer.id;
    setJob(data);
  }

  const handleImageChange = (e) => {
    setJob({ ...newJob, resume: e.target.files[0] });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", newJob.name);
    formData.append("email", newJob.email);
    formData.append("phone", newJob.phone);
    formData.append("qualification", newJob.qualification);
    formData.append("employerId", employer.id);
    formData.append("jobseekerId", newJob._id);
    formData.append("jobId", props.match.params.id);
    formData.append("status", "");

    if (!newJob.resume) {
      setErr(true);
    } else {
      formData.append("resume", newJob.resume);

      dispatch(applyJob(formData))
        .then((res) => props.history.push("/jhome"))
        .catch((e) => {
          toast.error(e.response.data);
        });
    }
  };

  return (
    <div id="registerform">
      <h3>Apply for job</h3>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter full Name"
          name="name"
          defaultValue={newJob.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          name="email"
          defaultValue={newJob.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          defaultValue={newJob.phone}
          placeholder="Enter phone"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Qualification</label>
        {console.log("quali", newJob.qualification)}
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
        <label>Resume</label>
        <input
          type="file"
          className="form-control"
          name="resume"
          placeholder="Select your latest resume in .pdf format"
          onChange={handleImageChange}
        />
        {err ? <span style={{ color: "red" }}>Resume is Required</span> : ""}
      </div>

      {/* <div className="form-row">
        <div className="form-group col-md-3">
          <div className="upload-btn-wrapper">
            <button className="btn btn1"> Resume</button>
            <input id="uploadResume" type="file" name="resume" required />
          </div>
        </div>
  </div> */}

      <button
        onClick={() => handleSubmit()}
        className="btn btn-primary btn-block"
      >
        Apply
      </button>
    </div>
  );
}

export default ApplyJob;
