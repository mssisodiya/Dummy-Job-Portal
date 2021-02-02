export const jobAppliedReducer = (state = [], action) => {
  switch (action.type) {
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
