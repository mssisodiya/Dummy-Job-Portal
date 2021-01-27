import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAJob } from "../../actions/jobPost";
import { applyJob, getJobseeker } from "../../actions/jobSeeker";

function ApplyJob(props) {
  console.log("props", props.employer);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [employer, setEmployer] = useState([]);
  const [newJob, setJob] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    jobId: props.match.params.id,
    jobseekerId: user._id,
    employerId: "",
  });

  useEffect(() => {
    // dispatch(getJobseeker(user._id)).then((res) => setTemp(res[0]));
    dispatch(getAJob(newJob.jobId)).then((res) => setEmployer(res.employer));
  }, [dispatch]);

  function handleChange({ currentTarget: input }) {
    const data = { ...newJob };
    data[input.name] = input.value;
    data["employerId"] = employer;
    setJob(data);
    console.log("final", newJob);
  }

  // const uploadResume=(e) => {
  //   console.log("RESUMES", e);

  //   var fd = new FormData();
  //   var filesList = document.getElementById("uploadResume").files;
  //   if (!filesList[0].name.match(/.(pdf|doc|docx)$/i)) {
  //     console.log("Please select an pdf/doc/docx file to upload.");
  //     return false;
  //   }
  //   fd.append("uploadSelect", filesList[0]);
  //   console.log(fd);

  //   try {
  //     let ret = await api("POST", "/document/upload", fd, {
  //       "Content-Type": "multipart/form-data"
  //     });
  //     console.log(ret);
  //     if (ret.status >= 200 && ret.status < 300) {
  //       let data = {
  //         resume_url: S3_URL + ret["data"]["payLoad"]
  //       };
  //       console.log("Resume added Successfully.");
  //      setResume(
  //          data.resume_url
  //       )

  //     }
  //   } catch (error) {
  //     console.log(Object.keys(error), error.response);
  //     console.log(error); //Pass Full response object to the printError method.
  //   }
  // }

  const handleSubmit = () => {
    dispatch(applyJob(newJob));
    props.history.push("/jhome");
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
          value={newJob.name}
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
          value={newJob.email}
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
          value={newJob.phone}
          placeholder="Enter phone"
          onChange={handleChange}
        />
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
          <option selected>Choose...</option>
          <option value="BE/BTECH">BE/BTECH</option>
          <option value="MCA">MCA</option>
        </select>
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
