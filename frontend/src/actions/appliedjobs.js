import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const applyJob = (job, file) => {
  return async function (dispatch) {
    const { data: applyJob } = await axios.post(
      `${apiUrl}jobseeker/apply/${job.jobId}`,
      job,
      file
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
