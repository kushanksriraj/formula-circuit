import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
