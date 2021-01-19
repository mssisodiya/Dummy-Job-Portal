import axios from "axios";

export const addEmployer = (newEmployer) => {
  return async (dispatch) => {
    const { data: employer } = await axios.post(
      `http://localhost:8000/api/employer`,
      newEmployer
    );
    dispatch({
      type: "ADD_EMPLOYER",
      payload: employer,
    });
  };
};

export const getEmployer = (id) => {
  return async function (dispatch) {
    const { data: employer } = await axios.get(
      `http://localhost:8000/api/employer/${id}`
    );
    dispatch({
      type: "GET_EMPLOYER",
      payload: employer,
    });
    return employer;
  };
};
