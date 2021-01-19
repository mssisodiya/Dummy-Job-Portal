import axios from "axios";

export const addJobSeeker = (newJobSeeker) => {
  return async (dispatch) => {
    const { data: jobSeeker } = await axios.post(
      "http://localhost:8000/api/jobseeker",
      newJobSeeker
    );
    dispatch({
      type: "ADD_JOBSEEKER",
      payload: jobSeeker,
    });
  };
};
