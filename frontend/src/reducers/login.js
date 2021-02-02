const initState = { isAuthenticated: false };

export const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "ELOGIN":
      return { ...state, data: action.payload, isAuthenticated: true };
    case "JLOGIN":
      return { ...state, data: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
