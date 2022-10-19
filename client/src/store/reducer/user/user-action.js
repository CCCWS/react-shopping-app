import axios from "axios";
import { userAction } from "./user";

export const auth = () => {
  return async (dispatch) => {
    const getApi = async () => {
      await axios.get("/api/user/auth");
    };
    getApi();
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const loginApi = async () => {
      const res = await axios.post("/api/user/login", data);

      if (!res.data.loginSuccess) {
        alert(res.data.message);
      }

      if (res.data.loginSuccess) {
        dispatch(userAction.setLogin(res.data.user));
      }
    };

    loginApi();
  };
};

export const logout = () => {
  return async (dispatch) => {
    const logoutApi = async () => {
      dispatch(userAction.setLogout());
      await axios.get("/api/user/logout");
    };

    logoutApi();
  };
};
