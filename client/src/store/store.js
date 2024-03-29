import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
//storage > localStorage에 데이터를 저장 > 유저가 로그아웃을 누를때까지 로그인을 유지
//sessionStorage > sessionStorage > 현재 탭에서만 데이터가 유지되며
//새로고침시에는 데이터가 유지되지면 새로운 탭일경우 데이터가 유지되지 않음

import userReducer from "./reducer/user/user";
import pathnameReducer from "./reducer/pathname";
import warningMessageReducer from "./reducer/warningMessage";
import darkMode from "./reducer/darkMode";
import notification from "./reducer/notification";
import cart from "./reducer/cart";

const reducers = combineReducers({
  user: userReducer,
  pathname: pathnameReducer,
  warningMessage: warningMessageReducer,
  darkMode: darkMode,
  notification: notification,
  cart: cart,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "darkMode"], //storage에 저장할 state, 새로고침해도 사라지지 않음
  blacklist: ["modalOpen", "warningMessageReducer", "notification", "cart"], //저장하지 않을 state, 새로고침시 사라짐
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
