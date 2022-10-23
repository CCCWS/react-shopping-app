import { createSlice } from "@reduxjs/toolkit";

const notificationState = { notification: null };
const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationState,
  reducers: {
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const notificationAction = notificationSlice.actions;
export default notificationSlice.reducer;
