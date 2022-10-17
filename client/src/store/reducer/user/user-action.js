import axios from "axios";
import { userAction } from "./user";

const postUrl =
  process.env.NODE_ENV === "production"
    ? "https://blooming-castle-32175.herokuapp.com"
    : "http://localhost:3000";

export const auth = () => {
  return async (dispatch) => {
    const getApi = async () => {
      const res = await axios.get(`${postUrl}/api/user/auth`);

      // if(!res.data)
      console.log(res);
    };
    getApi();
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const loginInfo = async () => {
      const res = await axios.post(`${postUrl}/api/user/login`, data);
      dispatch(userAction.setUserData(res.data));
      return res;
    };
    loginInfo();
    return "test";
  };
};
