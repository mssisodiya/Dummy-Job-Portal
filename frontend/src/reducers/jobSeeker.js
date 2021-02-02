export const jobSeekerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_JOBSEEKER":
      return [...state, action.payload];
    case "GET_JOBSEEKER":
      return action.payload;
    case "GET_COMPANY":
      return action.payload;
    default:
      return state;
  }
};
