import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        className: action.payload.className,
      };
    },
    clearNotification() {
      return { message: "", className: "" };
    },
  },
});

export const { clearNotification } = notificationsSlice.actions;

export const setNotification = (message, className, timeout) => {
  return async (dispatch) => {
    dispatch(
      notificationsSlice.actions.setNotification({ message, className }),
    );
    setTimeout(() => {
      dispatch(notificationsSlice.actions.clearNotification());
    }, timeout * 1000);
  };
};

export default notificationsSlice.reducer;
