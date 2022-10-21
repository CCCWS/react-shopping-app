import { createSlice } from "@reduxjs/toolkit";

const darkModeState = { darkMode: false };
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: darkModeState,
  reducers: {
    onMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const darkModeAction = darkModeSlice.actions;
export default darkModeSlice.reducer;
