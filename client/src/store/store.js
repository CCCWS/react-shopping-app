import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
//storage > localStorage에 데이터를 저장 > 유저가 로그아웃을 누를때까지 로그인을 유지
//sessionStorage > sessionStorage > 현재 탭에서만 데이터가 유지되며
//새로고침시에는 데이터가 유지되지면 새로운 탭일경우 데이터가 유지되지 않음

import userReducer from "./reducer/user/user";
import modalReducer from "./reducer/modal";

const reducers = combineReducers({
  user: userReducer,
  modalOpen: modalReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
