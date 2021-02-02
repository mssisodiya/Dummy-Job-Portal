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
