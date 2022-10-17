import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_action/user_action";
import { useNavigate } from "react-router-dom";

//App.js에서 라우트의 요소로 호출하여 랜더링할 컴포넌트를 매개변수로 받음
//해당 페이지에 이동할때마다 실행이되며 dispatch함수를 사용하여 서버와 통신하고
//로그인 여부를 확인한뒤 리덕스 스토어에 로그인 정보를 담음
//매개변수로 전달받은 컴포넌트에 로그인 정보를 props로 전달한뒤 리턴하여
//이 컴포넌트는 user정보를 props로 받아서 사용할 수 있는 고차 컴포넌트가 됨

//두번째 매개변수로 옵션을 추가로 받아서 해당 페이지의 접근여부를 판별할 수 있음
//만약 페이지가 로그인을 해야하는 페이지이고 로그인이 되어있지 않다면
//해당 여부를 판별하여 다시 메인화면으로 돌려보낼 수 있음
//하지만 페이지에 일단 접속한 후에 판별이 가능하기때문에 접속후 수행하는 함수로 인한 에러발생이 있을 수 있으므로
//해당 기능은 header의 button에서 페이지 접근전에 버튼 클릭으로 접속 여부를 판단하는것으로 사용

function Auth(Component, option, adminRoute = null) {
  //option에 올 수있는 값
  //null 아무나 출입가능
  //ture 로그인 유저만 출입 가능
  //false 로그인 유저는 출입 불가

  const AuthCheck = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(auth());
      // .then((response) => {
      //   if (!response.payload.isAuth) {
      //     // nav("/"); // 로그인 안한 유저가 로그인한 유저만 출입 가능한곳에 들어가려할때
      //   } else {
      //     if (adminRoute && !response.payload.isAdmin) {
      //       //로그인 했으나 관리자 페이지에 들어가려할때
      //       nav("/");
      //     } else {
      //       if (option === false)
      //         //로그인한 유저는 출입 불가능한 경우, 로그인페이지, 가입페이지
      //         nav("/");
      //     }
      //   }
      // });
    }, []);

    if (Object.keys(user).length !== 0) return <Component user={user} />;
  };

  return <AuthCheck />;
}

export default Auth;

//redux-persist를 사용하면서 페이지 이동마다 로그인 여부를 확일할 
//필요없이 스토어에 데이터가 계속 남아있음
//페이지마다 인증을 위한 서버와의 불필요한 통신을 없애면서 사용하지 않음