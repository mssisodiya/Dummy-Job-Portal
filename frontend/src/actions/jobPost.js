import axios from "axios";

export const addJob = (job) => {
  return async (dispatch) => {
    const { data: newjob } = await axios.post(
      `http://localhost:8000/api/jobpost/${job.id}`,
      job
    );
    dispatch({
      type: "ADD_JOB",
      payload: newjob,
    });
  };
};

export const getAJob = (id) => {
  return async function (dispatch) {
    const { data: jobpost } = await axios.get(
      `http://localhost:8000/api/jobpost/job/${id}`
    );
    dispatch({
      type: "GET_A_JOB",
      payload: jobpost,
    });
    return jobpost;
  };
};

//get all jobPosts of a particular employer
export const getJob = (id) => {
  return async function (dispatch) {
    const { data: jobpost } = await axios.get(
      `http://localhost:8000/api/jobpost/${id}`
    );
    dispatch({
      type: "GET_JOB",
      payload: jobpost,
    });
    return jobpost;
  };
};

export const editJob = (job) => {
  return async function (dispatch) {
    console.log("job", job);
    const { data: jobpost } = await axios.put(
      `http://localhost:8000/api/jobpost/${job._id}`,
      job
    );
    dispatch({
      type: "EDIT_JOB",
      payload: jobpost,
    });
    return jobpost;
  };
};
