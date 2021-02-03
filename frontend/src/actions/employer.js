import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const addEmployer = (newEmployer, file) => {
  return async (dispatch) => {
    const { data: employer } = await axios.post(
      `${apiUrl}employer`,
      newEmployer,
      file
    );
    dispatch({
      type: "ADD_EMPLOYER",
      payload: employer,
    });
    toast.success("Registered succesfully now you can login");
  };
};

export const getEmployer = (id) => {
  return async function (dispatch) {
    const { data: employer } = await axios.get(`${apiUrl}employer/${id}`);
    dispatch({
      type: "GET_EMPLOYER",
      payload: employer,
    });

    return employer;
  };
};

export const getApplications = (id) => {
  return async function (dispatch) {
    const { data: applications } = await axios.get(
      `${apiUrl}employer/applications/${id}`
    );
    dispatch({
      type: "GET_APPLICATIONS",
      payload: applications,
    });
    return applications;
  };
};

export const getAnApplication = (id) => {
  return async function (dispatch) {
    const { data: appl } = await axios.get(
      `${apiUrl}employer/single_application/${id}`
    );
    dispatch({
      type: "GET_AN_APPLICATION",
      payload: appl,
    });
    return appl;
  };
};
