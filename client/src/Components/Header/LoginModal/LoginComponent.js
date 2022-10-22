import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { login, register } from "../../../store/reducer/user/user-action";

function LoginComponent({ type, setType }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
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
            <Input
              type="email"
              ref={emailRef}
              placeholder="이메일"
              darkMode={darkMode}
            />
            <Input
              type="password"
              ref={passwordRef}
              placeholder="비밀번호"
              darkMode={darkMode}
            />
            <Button type="submit" onSubmit={onSubmit}>
              로그인
            </Button>
          </>
        ) : (
          <>
            {registerError.error && <Warning>{registerError.message}</Warning>}
            <Input
              type="email"
              ref={registerEmailRef}
              placeholder="이메일"
              darkMode={darkMode}
            />
            <Input
              type="text"
              ref={registerNameRef}
              placeholder="이름"
              darkMode={darkMode}
            />
            <Input
              type="password"
              ref={registerPasswordRef}
              placeholder="비밀번호"
              darkMode={darkMode}
            />
            <Input
              type="password"
              ref={registerPasswordConfRef}
              placeholder="비밀번호 확인"
              darkMode={darkMode}
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
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--gray_transparency)"};
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  position: relative;
  background-color: var(--red_transparency);
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin: auto;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: var(--red);
  }
`;

export default LoginComponent;
