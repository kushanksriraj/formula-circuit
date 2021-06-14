import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllNotificationsAsync = createAsyncThunk(
  "notification/getAll",
  async () => {
    try {
      const res = await axios.get("/notification");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notificationList: [],
    notificationLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    addNewNotification(state, action) {
      console.log({ action });
      state.notificationList = state.notificationList.concat(
        action.payload.data
      );
    },
  },
  extraReducers: {
    [getAllNotificationsAsync.pending]: (state) => {
      state.notificationLoading = true;
    },
    [getAllNotificationsAsync.fulfilled]: (state, action) => {
      state.notificationLoading = false;
      if (action.payload.success) {
        state.notificationList =
          action.payload.notificationList?.notificationList || [];
      }
    },
  },
});

export default notificationSlice.reducer;

export const { addNewNotification } = notificationSlice.actions;

export const getAllNotifications = createSelector(
  (state) => state.notification.notificationList,
  (value) => value
);

export const getLoadingStatus = createSelector(
  (state) => state.notification.notificationLoading,
  (value) => value
);
