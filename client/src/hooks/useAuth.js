import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = (check) => {
  const nav = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const userId = useSelector((state) => state.user.userInfo._id);

  useEffect(() => {
    //사용자 인증이 필요하고 인증이 되지 않았을 경우
    if (check && !isAuth) {
      alert("로그인이 필요한 페이지입니다.");
      nav("/");
    }
  }, [check, isAuth, nav]);

  return { isAuth, userId };
};

export default useAuth;

//매개변수를 받아서 인증이 필요한 페이지라면
//리덕스 스토어에서 인증여부를 확인한 후 페이지이동을 결정하며
//스토어의 데이터를 꺼내주는 hooks
