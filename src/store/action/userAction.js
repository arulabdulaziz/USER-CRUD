import axios from "./../../axios/axios"
export const setUsers =(payload) => {
    return {
        type: "set/users",
        users: payload
    }
}
export const setUser = (payload) => {
  return {
    type: "set/user",
    user: payload,
  };
};
export const setUsersError = (payload) => {
  return {
    type: "set/setUserError",
    usersError: payload,
  };
};
export const setUserError = (payload) => {
  return {
    type: "set/setUserError",
    usersError: payload,
  };
};
export const setLoadingUsers = (payload) => {
  return {
    type: "set/loadingUsers",
    loadingUsers: payload,
  };
};
export const setLoadingUser = (payload) => {
  return {
    type: "set/loadingUser",
    loadingUser: payload,
  };
};
export const isFetchUsers = (payload) => {
  return {
    type: "set/isFetchUsers",
    isFetchUsers: payload,
  };
};
export const fetchUsers = () => {
   return async (dispatch, getState) => {
       if(getState().userReducer.isFetchUsers){
           try {
               dispatch(setLoadingUsers(true));
               const {data} = await axios.get("users/")
               dispatch(setUsers(data))
               dispatch(isFetchUsers(false))
           } catch (error) {
               console.log(error)
               dispatch(setUserError(error));
           } finally {
               dispatch(setLoadingUsers(false))
           }
       }
   }
}
export const fetchUser = (id) => {
  return async (dispatch, getState) => {
      try {
        dispatch(setLoadingUser(true));
        const { data } = await axios.get("users/" + id);
        dispatch(setUser(data));
      } catch (error) {
        console.log(error);
        dispatch(setUserError(error));
      } finally {
        dispatch(setLoadingUser(false));
      }
  };
};