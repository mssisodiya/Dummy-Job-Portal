const initState = { jobPost: [] };

export const jobPostReducer = (state = initState.jobPost, action) => {
  switch (action.type) {
    case "ADD_JOB":
      return [...state, action.payload];
    case "GET_JOB": //of a particular employer
      return [...state, action.payload];
    case "GET_A_JOB":
      return [...state, action.payload];
    case "GET_ALL_JOB":
      return [...state, action.payload];
    case "EDIT_JOB":
      return [...state, action.payload];
    case "DELETE_JOB":
      return [...state];
    default:
      return state;
  }
};
