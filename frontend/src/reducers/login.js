const initState = { user: [] };

export const employerReducer = (state = initState.user, action) => {
  switch (action.type) {
    case "LOGIN":
      return [...state, action.payload];
    default:
      return state;
  }
};
