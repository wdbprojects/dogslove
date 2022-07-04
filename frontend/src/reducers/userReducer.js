const userReducer = (state = null, action) => {
  if (action.type === "LOGIN") {
    return { ...state, userAction: action.payload };
  }
  return state;
};

export default userReducer;
