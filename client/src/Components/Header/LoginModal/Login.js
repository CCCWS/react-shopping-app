import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { warningMessageAction } from "../../../store/reducer/warningMessage";
import LoginForm from "./LoginForm";

function Login({ setOpenModal }) {
  const dispatch = useDispatch();
  const [type, setType] = useState("login");

  //로그인 > 회원가입, 회원가입 > 로그인으로 전환시 기존의 에러메세지 초기화
  useEffect(() => {
    dispatch(
      warningMessageAction.setRegisterError({
        error: false,
        message: "",
      })
    );

    dispatch(
      warningMessageAction.setLoginError({
        error: false,
        message: "",
      })
    );
  }, [dispatch, type]);

  //로그인에서 회원가입으로
  const onLogin = () => {
    setType("login");
  };

  //회원가입에서 로그인으로
  const onRegister = () => {
    setType("register");
  };

  return (
    <>
      <LoginTitle type={type}>
        {type === "login" ? "로그인" : "회원가입"}
      </LoginTitle>

      <LoginForm type={type} setType={setType} setOpenModal={setOpenModal} />

      <div>
        {type === "login" ? (
          <LoginFooter>
            아이디가 없으신가요?
            <span onClick={onRegister}> 회원가입</span>
          </LoginFooter>
        ) : (
          <LoginFooter>
            아이디가 있으신가요?
            <span onClick={onLogin}>로그인</span>
          </LoginFooter>
        )}
      </div>
    </>
  );
}

const LoginTitle = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.type === "login" ? "var(--orange_normal)" : "var(--green)"};
  margin-bottom: 0.4rem;
`;

const LoginFooter = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 1rem;

  display: flex;
  justify-content: center;

  span {
    margin-left: 0.5rem;
    border-bottom: 1px solid transparent;
    color: red;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid red;
    }
  }
`;

export default Login;
