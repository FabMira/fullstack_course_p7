import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { clearNotification } = notificationsSlice.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(notificationsSlice.actions.setNotification(message));
    setTimeout(() => {
      dispatch(notificationsSlice.actions.clearNotification());
    }, timeout * 1000);
  };
};

export default notificationsSlice.reducer;
