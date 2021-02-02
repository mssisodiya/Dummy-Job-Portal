import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const elogin = (data) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`${apiUrl}auth/elogin`, data);
    dispatch({
      type: "ELOGIN",
      payload: user,
    });
    toast.success("Logged in succesfully");
    return user;
  };
};

export const jlogin = (data) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`${apiUrl}auth/jlogin`, data);
    dispatch({
      type: "JLOGIN",
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
