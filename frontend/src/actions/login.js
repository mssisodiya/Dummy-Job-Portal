import axios from "axios";

export const login = (data) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(
      `http://localhost:8000/api/auth/login`,
      data
    );
    dispatch({
      type: "LOGIN",
      payload: user,
    });
    return user;
  };
};
