import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const logUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunk) => {
    try {
      const res = await axios.post("/user/login", { email, password });
      if (res.data.success) {
        localStorage.setItem(
          "login",
          JSON.stringify({ token: res.data.user.token })
        );
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const signUpUserAsync = createAsyncThunk(
  "user/signup",
  async ({ name, username, email, password }, thunk) => {
    try {
      const res = await axios.post("/user/sign-up", {
        user: {
          name,
          username,
          email,
          password,
          bio: "",
          profileURL: "",
          followingList: [],
          followersList: [],
        },
      });
      if (res.data.success) {
        localStorage.setItem(
          "login",
          JSON.stringify({ token: res.data.user.token })
        );
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      _id: null,
      name: null,
      email: null,
      username: null,
      bio: null,
      profileURL: null,
      followingList: [],
      followersList: [],
      token: null,
    },
    isUserLoggedIn: false,
    userLoading: false,
  },
  reducers: {
    // remove this
    logInUser(state) {
      state.isUserLoggedIn = true;
    },
  },
  extraReducers: {
    [logUserAsync.pending]: (state, action) => {
      state.userLoading = true;
    },
    [logUserAsync.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.userLoading = false;
        state.isUserLoggedIn = true;
        state.data = action.payload.user;
      }
    },
    [signUpUserAsync.pending]: (state, action) => {
      state.userLoading = true;
    },
    [signUpUserAsync.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.userLoading = false;
        state.isUserLoggedIn = true;
        state.data = action.payload.user;
      }
    },
  },
});

export const { logInUser } = userSlice.actions;

export default userSlice.reducer;

export const getLoginStatus = createSelector(
  (state) => state.user.isUserLoggedIn,
  (value) => value
);
export const getLoadingStatus = createSelector(
  (state) => state.user.userLoading,
  (value) => value
);
