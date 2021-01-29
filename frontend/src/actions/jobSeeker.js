import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const addJobSeeker = (newJobSeeker) => {
  return async (dispatch) => {
    const { data: jobSeeker } = await axios.post(
      `${apiUrl}jobseeker`,
      newJobSeeker
    );
    dispatch({
      type: "ADD_JOBSEEKER",
      payload: jobSeeker,
    });
    toast.success("Registered succesfully now you can login");
  };
};

export const getJobseeker = (id) => {
  return async function (dispatch) {
    const { data: jobSeeker } = await axios.get(`${apiUrl}jobseeker/${id}`);
    dispatch({
      type: "GET_JOBSEEKER",
      payload: jobSeeker,
    });
    return jobSeeker;
  };
};

export const getCompany = (id) => {
  return async function (dispatch) {
    const { data: company } = await axios.get(
      `${apiUrl}employer/cdetail/${id}`
    );
    dispatch({
      type: "GET_COMPANY",
      payload: company,
    });
    return company;
  };
};

export const applyJob = (job) => {
  return async function (dispatch) {
    console.log("jobId", job);
    const { data: applyJob } = await axios.post(
      `${apiUrl}jobseeker/apply/${job.jobId}`,
      job
    );
    dispatch({
      type: "APPLY_JOB",
      payload: applyJob,
    });
    toast.success("Applied Successfully");
    return applyJob;
  };
};

export const getAppliedJobs = (id) => {
  return async function (dispatch) {
    const { data: appliedJobs } = await axios.get(
      `${apiUrl}jobseeker/getApliedjobs/${id}`
    );
    dispatch({
      type: "GET_APPLIED_JOB",
      payload: appliedJobs,
    });
    return appliedJobs;
  };
};

export const withdrawJob = (id) => {
  return async function (dispatch) {
    const { data: appliedJobs } = await axios.delete(
      `${apiUrl}jobseeker/${id}`
    );
    dispatch({
      type: "DELETE_APPLIED_JOB",
      payload: appliedJobs,
    });
    return appliedJobs;
  };
};
