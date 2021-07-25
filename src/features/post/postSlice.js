import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getFeedAsync = createAsyncThunk("post/feed", async (_, thunk) => {
  const {
    post: { cursor, hasMore },
  } = thunk.getState();
  if (hasMore) {
    try {
      let res;
      if (cursor) {
        res = await axios.get(`/feed?cursor=${cursor}`);
      } else {
        res = await axios.get("/feed");
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
});

export const likePostAsync = createAsyncThunk(
  "post/like",
  async ({ postId }) => {
    try {
      const res = await axios.post(`/post/${postId}/like`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const unlikePostAsync = createAsyncThunk(
  "post/unlike",
  async ({ postId }) => {
    try {
      const res = await axios.post(`/post/${postId}/unlike`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const reactToPostAsync = createAsyncThunk(
  "post/react",
  async ({ postId, type }) => {
    try {
      const res = await axios.post(`/post/${postId}/react?type=${type}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const unReactToPostAsync = createAsyncThunk(
  "post/unreact",
  async ({ postId, type }) => {
    try {
      const res = await axios.post(`/post/${postId}/unreact?type=${type}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async ({ content, author }) => {
    try {
      const res = await axios.post(`/post`, {
        post: {
          content,
          author,
          likedBy: [],
          reactions: {
            love: [],
            care: [],
            claps: [],
          },
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const savePostAsync = createAsyncThunk(
  "post/savePost",
  async ({ content, postId }) => {
    try {
      const res = await axios.post(`/post/${postId}`, {
        content,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  "post/deletePost",
  async ({ postId }) => {
    try {
      const res = await axios.delete(`/post/${postId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  postList: [],
  postLoading: false,
  cursor: null,
  hasMore: true,
  isError: false,
  errorMessage: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetState(state) {
      state.postList = [];
      state.postLoading = false;
      state.cursor = null;
      state.hasMore = true;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [getFeedAsync.pending]: (state, action) => {
      state.postLoading = true;
    },
    [getFeedAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload && action.payload.success) {
        state.cursor = action.payload.next_cursor;
        state.hasMore = action.payload.hasMore;
        if (action.payload.postList.length) {
          const uniquePostList = action.payload.postList.filter((post) =>
            state.postList.filter((obj) => obj._id !== post._id)
          );
          state.postList = state.postList.concat(uniquePostList);
        }
      }
    },
    [likePostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [likePostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        const post = state.postList.find(
          (post) => post._id === action.payload.postId
        );
        post.likedBy = action.payload.likedBy;
      }
    },

    [unlikePostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [unlikePostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        const post = state.postList.find(
          (post) => post._id === action.payload.postId
        );
        post.likedBy = action.payload.likedBy;
      }
    },

    [reactToPostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [reactToPostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        const post = state.postList.find(
          (post) => post._id === action.payload.postId
        );
        post.reactions = action.payload.reactions;
      }
    },
    [unReactToPostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [unReactToPostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        const post = state.postList.find(
          (post) => post._id === action.payload.postId
        );
        post.reactions = action.payload.reactions;
      }
    },
    [createPostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        state.postList = [action.payload.newPost, ...state.postList];
      }
    },
    [savePostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [savePostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        state.postList = state.postList.map((post) => {
          if (post._id === action.payload.updatedPost._id) {
            // return action.payload.updatedPost;
            const content = action.payload.updatedPost.content;
            return { ...post, content };
          }
          return post;
        });
      }
    },
    [deletePostAsync.pending]: (state) => {
      state.postLoading = true;
    },
    [deletePostAsync.fulfilled]: (state, action) => {
      state.postLoading = false;
      if (action.payload.success) {
        state.postList = state.postList.filter(
          (post) => post._id !== action.payload.deletedPostId
        );
      }
    },
  },
});

export default postSlice.reducer;
export const { resetState } = postSlice.actions;

export const getPostFeed = createSelector(
  (state) => state.post,
  (value) => value
);

export const getLoadingStatus = createSelector(
  (state) => state.post.postLoading,
  (value) => value
);
