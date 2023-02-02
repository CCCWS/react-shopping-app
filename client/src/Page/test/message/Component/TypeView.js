import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Chat from "../Page/Chat";
import Status from "../Page/Status";
import Call from "../Page/Call";

const TypeView = ({ currType, setOnMessage, setClickMessage }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUserList(res.data);
    };

    getApi();
  }, []);

  return (
    <TypeBox>
      <TypeBoxItems currType={currType}>
        <Chat
          userList={userList}
          setOnMessage={setOnMessage}
          setClickMessage={setClickMessage}
        />
      </TypeBoxItems>

      <TypeBoxItems currType={currType}>
        <Status userList={userList} />
      </TypeBoxItems>

      <TypeBoxItems currType={currType}>
        <Call />
      </TypeBoxItems>
    </TypeBox>
  );
};

const TypeBox = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */

  display: flex;
  flex-flow: column wrap;

  overflow: hidden;
`;

const TypeBoxItems = styled.div`
  width: inherit;
  height: inherit;
  background-color: ${(props) => props.color};

  transition: 0.3s;
  transform: ${(props) => `translateX(-${props.currType}00%)`};
`;

export default TypeView;