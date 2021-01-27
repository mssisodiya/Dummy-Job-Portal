const initState = { user: [] };

export const loginReducer = (state = initState.user, action) => {
  switch (action.type) {
    case "LOGIN":
      return (state = action.payload);
    default:
      return state;
  }
};
