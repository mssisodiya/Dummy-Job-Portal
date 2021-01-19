const initState = { employer: [] };

export const employerReducer = (state = initState.employer, action) => {
  switch (action.type) {
    case "ADD_EMPLOYER":
      return [...state, action.payload];
    default:
      return state;
  }
};
