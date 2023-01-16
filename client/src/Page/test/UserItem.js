import React from "react";
import styled from "styled-components";

const UserItem = ({ user, index }) => {
  console.log(user);
  return (
    <>
      <Div>
        <div>index : {index}</div>
        <div>id : {user.id}</div>
        <div>name : {user.name}</div>
        <div>age : {user.age}</div>
        <div>score : {user.score}</div>
      </Div>
    </>
  );
};

const Div = styled.div`
  background-color: beige;
  display: table;

  font-size: 2rem;

  margin-bottom: 20px;
`;

export default React.memo(UserItem);
