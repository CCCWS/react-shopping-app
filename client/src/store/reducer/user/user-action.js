import axios from "axios";
import { userAction } from "./user";
import { warningMessageAction } from "../warningMessage";

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
        dispatch(
          warningMessageAction.setLoginError({
            error: true,
            message: res.data.message,
          })
        );
      }

      if (res.data.loginSuccess) {
        dispatch(userAction.setLogin(res.data.user));
        dispatch(
          warningMessageAction.setLoginError({
            error: false,
            message: "",
          })
        );
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

export const register = (data) => {
  let registerCheck = false;
  return async (dispatch) => {
    const registerApi = async () => {
      const res = await axios.post("/api/user/register", data);

      if (!res.data.success) {
        dispatch(
          warningMessageAction.setRegisterError({
            error: true,
            message: res.data.message,
          })
        );
        return false;
      }

      if (res.data.success) {
        dispatch(
          warningMessageAction.setRegisterError({
            error: false,
            message: "",
          })
        );
        return true;
      }
    };

    if (data.password !== data.passwordConf) {
      dispatch(
        warningMessageAction.setRegisterError({
          error: true,
          message: "비밀번호를 다시 확인해주세요.",
        })
      );
    } else {
      registerCheck = registerApi();
    }
    return registerCheck;
  };
};
