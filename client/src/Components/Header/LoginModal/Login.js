import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import styled from "styled-components";

function Login() {
  const [type, setType] = useState("login");

  return (
    <>
      <LoginTitle>{type === "login" ? "로그인" : "회원가입"}</LoginTitle>

      <LoginComponent type={type} setType={setType} />

      <div>
        {type === "login" ? (
          <LoginFooter>
            아이디가 없으신가요?
            <span onClick={() => setType("register")}> 회원가입</span>
          </LoginFooter>
        ) : (
          <LoginFooter>
            아이디가 있으신가요?
            <span onClick={() => setType("login")}>로그인</span>
          </LoginFooter>
        )}
      </div>
    </>
  );
}

const LoginTitle = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  background-color: rgba(255, 166, 0, 0.7);
  margin-bottom: 1rem;
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
