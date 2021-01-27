export const employerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EMPLOYER":
      return [...state, action.payload];
    case "GET_EMPLOYER":
      return action.payload;
    case "GET_AN_APPLICATION":
      return action.payload;
    default:
      return state;
  }
};
