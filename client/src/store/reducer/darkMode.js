import { createSlice } from "@reduxjs/toolkit";

const darkModeState = { darkMode: false };
const darkModeSlice = createSlice({
  name: "warningMessage",
  initialState: darkModeState,
  reducers: {
    onMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const warningMessageAction = darkModeSlice.actions;
export default darkModeSlice.reducer;
