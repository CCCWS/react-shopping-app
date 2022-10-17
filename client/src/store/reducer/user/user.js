import { createSlice, current } from "@reduxjs/toolkit";

const userState = { userInfo: {}, isAuth: false };
const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUserData(state, action) {
      // console.log(action);
      // state.userInfo
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
