import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./reducer/user/user";
import modalSlice from "./reducer/modal";

const store = configureStore({
  reducer: {
    user: userSlice,
    modalOpen: modalSlice,
  },
});

export default store;
