import { createSlice, current } from "@reduxjs/toolkit";

const userState = { userInfo: {}, isAuth: false };
const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setLogin(state, action) {
      console.log(action);
      state.userInfo = action.payload;
      state.isAuth = true;
    },

    setLogout(state, action) {
      state.userInfo = {};
      state.isAuth = false;
    },

    onAuthCheck(state, action) {
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
