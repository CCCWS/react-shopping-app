import { createSlice } from "@reduxjs/toolkit";

const userState = { userInfo: {}, isAuth: false };
const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setLogin(state, action) {
      state.userInfo = action.payload;
      state.isAuth = true;
    },

    setLogout(state) {
      state.userInfo = {};
      state.isAuth = false;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
