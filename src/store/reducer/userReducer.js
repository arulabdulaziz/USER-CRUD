const initialState = {
  users: [],
  usersError: null,
  loadingUsers: false,
  loadingUser : false,
  isFetchUsers: true,
  user: null,
  userError: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set/users":
      return { ...state, users: action.users };
    case "set/user":
      return { ...state, user: action.user };
    case "set/usersError":
      return { ...state, usersError: action.usersError };
    case "set/userError":
      return { ...state, userError: action.userError };
    case "set/loadingUsers":
      return { ...state, loadingUsers: action.loadingUsers };
    case "set/loadingUser":
      return { ...state, loadingUser: action.loadingUser };
    case "set/isFetchUsers":
      return { ...state, isFetchUsers: action.isFetchUsers };
    default:
      return state;
  }
}
export default reducer;
