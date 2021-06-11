import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getFeedAsync = createAsyncThunk(
  "post/feed",
  async ({ cursor, hasMore }, thunk) => {
    if (hasMore) {
      try {
        const res = await axios.get(`/feed?cursor=${cursor}`);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    postLoading: false,
    cursor: null,
    hasMore: true,
  },
  reducers: {},
  extraReducers: {
    [getFeedAsync.pending]: (state, action) => {
      state.postLoading = true;
    },
    [getFeedAsync.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.postLoading = false;
        state.cursor = action.payload.next_cursor;
        state.hasMore = action.payload.hasMore;
        if (action.payload.postList.length) {
            // _.uniqBy(posts,'id'); 
            state.postList = state.postList.concat()
        }
      }
    },
  },
});

export default postSlice.reducer;

export const getPostFeed = createSelector(
  (state) => state.post,
  (value) => value
);
export const getLoadingStatus = createSelector(
  (state) => state.post.postLoading,
  (value) => value
);
