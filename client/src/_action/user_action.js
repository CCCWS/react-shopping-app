import axios from "axios";
import {
  LOGIN_INFO,
  REGISTER_INFO,
  AUTH_INFO,
  ADD_CART,
  REMOVE_CART,
} from "./types";

const postUrl =
  process.env.NODE_ENV === "production"
    ? "https://blooming-castle-32175.herokuapp.com"
    : "http://localhost:3000";

console.log(process.env.NODE_ENV);

export const loginInfo = async (data) => {
  //submit로 발생한 값을 받아줌
  const res = await axios.post(`${postUrl}/api/user/login`, data); //서버에서 받은 데이터를 저장

  return {
    //request를 reducer에  > user_reducer.js
    type: LOGIN_INFO,
    payload: res.data,
  };
};

export const registerInfo = async (data) => {
  //submit로 발생한 값을 받아줌
  const res = await axios.post(`${postUrl}/api/user/register`, data); //서버에서 받은 데이터를 저장

  return {
    //request를 reducer에  > user_reducer.js
    type: REGISTER_INFO,
    payload: res.data,
  };
};

export const auth = async () => {
  //submit로 발생한 값을 받아줌
  const res = await axios.get(`${postUrl}/api/user/auth`); //서버에서 받은 데이터를 저장

  return {
    //request를 reducer에  > user_reducer.js
    type: AUTH_INFO,
    payload: res.data,
  };
};

export const addCart = async (data) => {
  const res = await axios.post(`${postUrl}/api/user/addCart`, {
    productId: data,
  }); //서버에서 받은 데이터를 저장

  return {
    //request를 reducer에  > user_reducer.js
    type: ADD_CART,
    payload: res.data.duplication,
  };
};

export const removeCart = async (data) => {
  const res = await axios.post(`${postUrl}/api/user/removeCart`, {
    id: data,
  }); //서버에서 받은 데이터를 저장
  return {
    //request를 reducer에  > user_reducer.js
    type: REMOVE_CART,
    payload: res.data.cart,
  };
};
