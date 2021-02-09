import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "./../config.json";

export const elogin = (cred) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`${apiUrl}auth/elogin`, cred);
    dispatch({
      type: "ELOGIN",
      payload: user,
    });
    toast.success("Logged in succesfully");
    return user;
  };
};

export const jlogin = (cred) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`${apiUrl}auth/jlogin`, cred);
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
