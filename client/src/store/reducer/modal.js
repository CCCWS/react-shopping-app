import { createSlice } from "@reduxjs/toolkit";

const modalState = { isOpen: false };
const modalSlice = createSlice({
  name: "modal",
  initialState: modalState,
  reducers: {},
});

export const cartAction = modalSlice.actions;
export default modalSlice.reducer;
