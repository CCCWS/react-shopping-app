import { createSlice } from "@reduxjs/toolkit";

const modalState = { isOpen: false, content: {} };
const modalSlice = createSlice({
  name: "modal",
  initialState: modalState,
  reducers: {
    modalOpen(state, action) {
      state.content = action.payload;
      state.isOpen = true;
    },

    modalClose(state) {
      state.content = {};
      state.isOpen = false;
    },
  },
});

export const modalAction = modalSlice.actions;
export default modalSlice.reducer;
