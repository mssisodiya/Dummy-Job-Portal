const initState = { jobSeeker: [] };

export const jobSeekerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_JOBSEEKER":
      return [...state, action.payload];
    case "GET_JOBSEEKER":
      return action.payload;
    case "GET_COMPANY":
      return action.payload;
    case "APPLY_JOB":
      return action.payload;
    case "GET_APPLIED_JOB":
      return action.payload;
    case "DELETE_APPLIED_JOB":
      return state.filter((job) => job._id !== action.payload._id);
    default:
      return state;
  }
};
