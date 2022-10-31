import React, { useState, useRef } from "react";
import styled from "styled-components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition"; // import "./Test2.css";

function Test2() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setText("");

    setTodo((todo) => [...todo, { id: new Date().getTime(), text: text }]);
  };

  const onDelete = (id) => {
    setTodo((todo) => todo.filter((todo) => todo.id !== id));
  };
  return (
    <Page>
      <Div>
        <Form onSubmit={onSubmit}>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </Form>

        <TransitionGroup>
          {todo.map((todo) => (
            <CSSTransition key={todo.id} timeout={500} classNames="fade">
              <Ul>
                <li>{todo.text}</li>
                <button onClick={() => onDelete(todo.id)}>X</button>
              </Ul>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Div>
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  height: 90vh;
  padding: 100px;
`;

const Form = styled.form`
  overflow-y: scroll;
`;

const Ul = styled.ul`
  display: flex;
`;

const Div = styled.div`
  background-color: var(--orange_hover);
  height: 300px;
  overflow-y: scroll;
`;

export default Test2;
