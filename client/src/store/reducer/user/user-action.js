import newAxios from "../../../productionCheck"
import { userAction } from "./user";
import { warningMessageAction } from "../warningMessage";

export const auth = () => {
  return async (dispatch) => {
    const getApi = async () => {
      await newAxios.get("/api/user/auth");
    };
    getApi();
  };
};

//로그인 요청시
export const login = (data) => {
  let loginCheck = false;

  return async (dispatch) => {
    const loginApi = async () => {
      const res = await newAxios.post("/api/user/login", data);
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
        return true;
      }
    };

    loginCheck = loginApi();
    return loginCheck;
  };
};

export const logout = () => {
  let logoutCheck = false;
  return async (dispatch) => {
    const logoutApi = async () => {
      dispatch(userAction.setLogout());
      await newAxios.get("/api/user/logout");
      return true;
    };

    logoutCheck = logoutApi();
    return logoutCheck;
  };
};

export const register = (data) => {
  let registerCheck = false;
  return async (dispatch) => {
    const registerApi = async () => {
      const res = await newAxios.post("/api/user/register", data);

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
