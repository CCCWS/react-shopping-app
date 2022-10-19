import { createSlice } from "@reduxjs/toolkit";

const warningMessageState = {
  login: { error: false, message: "" },
  register: { error: false, message: "" },
};
const warningMessageSlice = createSlice({
  name: "warningMessage",
  initialState: warningMessageState,
  reducers: {
    setLoginError(state, action) {
      state.login.error = action.payload.error;
      state.login.message = action.payload.message;
    },

    setRegisterError(state, action) {
      state.register.error = action.payload.error;
      state.register.message = action.payload.message;
    },
  },
});

export const warningMessageAction = warningMessageSlice.actions;
export default warningMessageSlice.reducer;
