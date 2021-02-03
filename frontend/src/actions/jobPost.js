import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const addJob = (job) => {
  return async (dispatch) => {
    const { data: newjob } = await axios.post(
      `${apiUrl}jobpost/${job.id}`,
      job
    );
    dispatch({
      type: "ADD_JOB",
      payload: newjob,
    });
    toast.success("Posted the job Successfully");
  };
};

export const getAJob = (id) => {
  return async function (dispatch) {
    const { data: jobpost } = await axios.get(`${apiUrl}jobpost/job/${id}`);
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
    const { data: jobpost } = await axios.get(`${apiUrl}jobpost/${id}`);
    dispatch({
      type: "GET_JOB",
      payload: jobpost,
    });
    return jobpost;
  };
};

// get all active jobs
export const getAllJob = () => {
  return async function (dispatch) {
    const { data: jobpost } = await axios.get(`${apiUrl}jobpost`);
    dispatch({
      type: "GET_ALL_JOB",
      payload: jobpost,
    });
    return jobpost;
  };
};

export const editJob = (job) => {
  return async function (dispatch) {
    const { data: jobpost } = await axios.put(
      `${apiUrl}jobpost/${job._id}`,
      job
    );
    dispatch({
      type: "EDIT_JOB",
      payload: jobpost,
    });
    toast.success("Modified succesfully");
  };
};

export const deleteJob = (job) => {
  return async function (dispatch) {
    const { data: jobpost } = await axios.delete(`${apiUrl}jobpost/${job}`);
    dispatch({
      type: "DELETE_JOBBBBB",
      payload: jobpost,
    });
  };
};
