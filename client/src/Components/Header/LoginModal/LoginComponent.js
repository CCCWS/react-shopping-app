import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { login } from "../../../store/reducer/user/user-action";

function LoginComponent({ type, setType }) {
  const Form = styled.form`
    width: 90%;

    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: auto;
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

  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const registerEmailRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const registerNameRef = useRef(null);
  const registerPasswordConfRef = useRef(null);

  useEffect(() => {
    if (type === "login") return emailRef.current.focus();
    if (type === "register") return registerEmailRef.current.focus();
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
      return;
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

      if (
        registerPasswordRef.current.value !==
        registerPasswordConfRef.current.value
      ) {
        return alert("비밀번호를 다시 확인해주세요.");
      }

      // dispatch(
      //   registerInfo({
      //     email: registerEmailRef.current.value,
      //     name: registerNameRef.current.value,
      //     password: registerPasswordRef.current.value,
      //   })
      // ).then((response) => {
      //   if (response.payload.success) {
      //     alert("가입 성공");
      //     setType("login");
      //   } else {
      //     alert("이미 사용중인 이메일입니다.");
      //   }
      // });
      return;
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        {type === "login" ? (
          <>
            <Input type="email" ref={emailRef} placeholder="이메일" />
            <Input type="password" ref={passwordRef} placeholder="비밀번호" />
            <Button type="submit" onSubmit={onSubmit}>
              로그인
            </Button>
          </>
        ) : (
          <>
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

export default LoginComponent;
