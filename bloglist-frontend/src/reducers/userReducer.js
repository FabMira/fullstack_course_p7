import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
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
  },
});

export const { setUser } = UserSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(
        setNotification(
          `User ${credentials.user} successfully logged in`,
          "success",
          5,
        ),
      );
    } catch (error) {
      dispatch(setNotification("Wrong credentials", "danger", 5));
    }
  };
};

export default UserSlice.reducer;
