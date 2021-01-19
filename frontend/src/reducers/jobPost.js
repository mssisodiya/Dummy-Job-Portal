const initState = { jobPost: [] };

export const jobPostReducer = (state = initState.jobPost, action) => {
  switch (action.type) {
    case "ADD_JOB":
      return [...state, action.payload];
    case "GET_JOB":
      return [...state, action.payload];
    case "GET_A_JOB":
      return [...state, action.payload];
    case "EDIT_JOB":
      return [...state, action.payload];
    default:
      return state;
  }
};
