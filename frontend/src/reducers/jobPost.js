const initState = { jobPost: [] };

export const jobPostReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_JOB":
      return [...state, action.payload];
    case "GET_JOB": //of a particular employer
      return (state = action.payload);
    case "GET_A_JOB":
      return [(state = action.payload)];
    case "GET_ALL_JOB":
      return [(state = action.payload)];
    case "EDIT_JOB":
      return [
        state.map((job) =>
          job._id === action.payload._id ? { ...job, job: action.payload } : job
        ),
      ];
    case "DELETE_JOBBBBB":
      return state.filter((job) => job._id !== action.payload._id);
    default:
      return state;
  }
};
