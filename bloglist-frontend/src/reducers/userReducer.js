import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import userService from "../services/users";
import { setNotification } from "../reducers/notificationsReducer";

const initialState = {
  user: null,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsers(state, action) {
      state.list = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, setUsers, clearUser } = UserSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(
        setNotification(
          `User ${user.name} successfully logged in`,
          "success",
          5,
        ),
      );
      return true;
    } catch (error) {
      dispatch(setNotification("Wrong credentials", "danger", 5));
      return false;
    }
  };
};

export const getUsersList = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers();
      dispatch(setUsers(users));
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(setNotification("Error fetching users", "danger", 5));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    dispatch(clearUser());
    dispatch(setNotification("Successfully logged out", "success", 5));
  };
};

export default UserSlice.reducer;
