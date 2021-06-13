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
          JSON.stringify({ token: res.data.user.token, isUserLoggedIn: true })
        );
        axios.defaults.headers.common["Authorization"] = res.data.user.token;
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
          JSON.stringify({ token: res.data.user.token, isUserLoggedIn: true })
        );
        axios.defaults.headers.common["Authorization"] = res.data.user.token;
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUserDataAsync = createAsyncThunk("user/getData", async () => {
  try {
    const res = await axios.get("/user");
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

export const logOutUserAsync = createAsyncThunk(
  "user/logOut",
  async (_, thunk) => {
    thunk.dispatch(logOutUser());
  }
);

export const updateUserDataAsync = createAsyncThunk(
  "user/updateProfile",
  async ({ bio, profileURL }) => {
    try {
      const res = await axios.post("/user/update", { bio, profileURL });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const followUserAsync = createAsyncThunk(
  "user/follow",
  async ({ userId }) => {
    try {
      const res = await axios.post("/user/network/follow", { userId });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const unFollowUserAsync = createAsyncThunk(
  "user/unfollow",
  async ({ userId }) => {
    try {
      const res = await axios.post("/user/network/unfollow", { userId });
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
    userLoading: true,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    logOutUser(state) {
      state.data = {
        _id: null,
        name: null,
        email: null,
        username: null,
        bio: null,
        profileURL: null,
        followingList: [],
        followersList: [],
        token: null,
      };
      state.isUserLoggedIn = false;
      state.userLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [logUserAsync.pending]: (state, action) => {
      state.userLoading = true;
    },
    [logUserAsync.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.isUserLoggedIn = true;
        state.data = action.payload.user;
      }
    },

    [getUserDataAsync.pending]: (state) => {
      state.userLoading = true;
    },

    [getUserDataAsync.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload?.success) {
        state.isUserLoggedIn = true;
        state.data = action.payload.user;
      }
    },

    [signUpUserAsync.pending]: (state, action) => {
      state.userLoading = true;
    },

    [signUpUserAsync.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.isUserLoggedIn = true;
        state.data = action.payload.user;
      }
    },

    [updateUserDataAsync.pending]: (state, action) => {
      state.userLoading = true;
    },

    [updateUserDataAsync.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.data.bio = action.payload.user.bio;
        state.data.profileURL = action.payload.user.profileURL;
      }
    },

    [followUserAsync.pending]: (state, action) => {
      state.userLoading = true;
    },

    [followUserAsync.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.data.followingList.push(action.payload.followedUserId);
      }
    },
    [unFollowUserAsync.pending]: (state, action) => {
      state.userLoading = true;
    },

    [unFollowUserAsync.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.data.followingList = state.data.followingList.filter(
          (id) => id !== action.payload.unFollowedUserId
        );
      }
    },
    // make extra reducers for error also
  },
});

export const { logOutUser } = userSlice.actions;

export default userSlice.reducer;

export const getLoginStatus = createSelector(
  (state) => state.user.isUserLoggedIn,
  (value) => value
);

export const getLoadingStatus = createSelector(
  (state) => state.user.userLoading,
  (value) => value
);

export const getUserId = createSelector(
  (state) => state.user.data._id,
  (value) => value
);

export const getUserToken = createSelector(
  (state) => state.user.data.token,
  (value) => value
);

export const getUserData = createSelector(
  (state) => state.user.data,
  (value) => value
);
