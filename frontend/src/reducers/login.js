const initState = { user: [], isAuthenticated: false };

export const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, data: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
