import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { login, register } from "../../../store/reducer/user/user-action";

function LoginComponent({ type, setType }) {
  const loginError = useSelector((state) => state.warningMessage.login);
  const registerError = useSelector((state) => state.warningMessage.register);

  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const registerEmailRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const registerNameRef = useRef(null);
  const registerPasswordConfRef = useRef(null);

  useEffect(() => {
    if (type === "login") {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      emailRef.current.focus();
    }

    if (type === "register") {
      registerEmailRef.current.value = "";
      registerPasswordRef.current.value = "";
      registerNameRef.current.value = "";
      registerPasswordConfRef.current.value = "";
      registerEmailRef.current.focus();
    }
  }, [type]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (type === "login") {
      if (emailRef.current.value < 1) {
        emailRef.current.focus();
        return;
      }

      if (passwordRef.current.value < 1) {
        passwordRef.current.focus();
        return;
      }

      dispatch(
        login({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }

    if (type === "register") {
      if (registerEmailRef.current.value < 1) {
        registerEmailRef.current.focus();
        return;
      }

      if (registerNameRef.current.value < 1) {
        registerNameRef.current.focus();
        return;
      }
      if (registerPasswordRef.current.value < 1) {
        registerPasswordRef.current.focus();
        return;
      }
      if (registerPasswordConfRef.current.value < 1) {
        registerPasswordConfRef.current.focus();
        return;
      }

      dispatch(
        register({
          email: registerEmailRef.current.value,
          password: registerPasswordRef.current.value,
          passwordConf: registerPasswordConfRef.current.value,
          name: registerNameRef.current.value,
        })
      ).then((res) => {
        if (res) {
          alert("가입완료");
          setType("login");
        }
      });
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        {type === "login" ? (
          <>
            {loginError.error && <Warning>{loginError.message}</Warning>}
            <Input type="email" ref={emailRef} placeholder="이메일" />
            <Input type="password" ref={passwordRef} placeholder="비밀번호" />
            <Button type="submit" onSubmit={onSubmit}>
              로그인
            </Button>
          </>
        ) : (
          <>
            {registerError.error && <Warning>{registerError.message}</Warning>}
            <Input type="email" ref={registerEmailRef} placeholder="이메일" />
            <Input type="text" ref={registerNameRef} placeholder="이름" />
            <Input
              type="password"
              ref={registerPasswordRef}
              placeholder="비밀번호"
            />
            <Input
              type="password"
              ref={registerPasswordConfRef}
              placeholder="비밀번호 확인"
            />
            <Button type="submit" onSubmit={onSubmit}>
              회원가입
            </Button>
          </>
        )}
      </Form>
    </>
  );
}

const Warning = styled.div`
  color: red;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  position: relative;
  background-color: rgba(255, 100, 100, 0.7);
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin: auto;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: rgba(255, 100, 100, 0.9);
  }
`;

export default LoginComponent;
