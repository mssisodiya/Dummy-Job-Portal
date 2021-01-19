const initState = { jobSeeker: [] };

export const jobSeekerReducer = (state = initState.jobSeeker, action) => {
  switch (action.type) {
    case "ADD_JOBSEEKER":
      return [...action.payload];
    default:
      return state;
  }
};
