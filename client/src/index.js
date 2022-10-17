import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxPromisee from "redux-promise";
import reduxThunk from "redux-thunk";
import Reducer from "./_reducers/index";

import "antd/dist/antd.min.css";
import App from "./App";

import store from "./store/store";

// const storeMiddleware = applyMiddleware(reduxPromisee, reduxThunk)(createStore);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
