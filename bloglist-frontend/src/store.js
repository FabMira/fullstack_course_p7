import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./reducers/notificationsReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
    users: userReducer,
  },
});

export default store;
