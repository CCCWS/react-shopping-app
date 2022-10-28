import { createSlice } from "@reduxjs/toolkit";

const pathnameState = { pathname: "" };
const pathnameSlice = createSlice({
  name: "pathname",
  initialState: pathnameState,
  reducers: {
    setPathname(state, action) {
      state.pathname = action.payload;
    },
  },
});

export const pathnameAction = pathnameSlice.actions;
export default pathnameSlice.reducer;
