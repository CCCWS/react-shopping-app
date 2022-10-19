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
      dispatch(userAction.onAuthCheck(res.data));
    };
    getApi();
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const loginApi = async () => {
      const res = await axios.post(`${postUrl}/api/user/login`, data);

      if (!res.data.loginSuccess) {
        alert(res.data.message);
      }

      if (res.data.loginSuccess) {
        dispatch(userAction.setLogin(res.data.user));
        // await axios.get(`${postUrl}/api/user/auth`);
      }
    };

    loginApi();
  };
};

export const logout = () => {
  return async (dispatch) => {
    const logoutApi = async () => {
      const res = await axios.get(`${postUrl}/api/user/logout`);

      if (!res.data.success) {
        throw new Error("logout error");
      }

      if (res.data.success) {
      }
      dispatch(userAction.setLogout());
    };
    logoutApi();
  };
};
