import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const login = (data) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`${apiUrl}auth/login`, data);
    dispatch({
      type: "LOGIN",
      payload: user,
    });
    toast.success("Logged in succesfully");
    return user;
  };
};

export const logout = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};
