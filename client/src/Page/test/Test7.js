import React, { useState, useEffect } from "react";

const Test7 = () => {
  const [onBoolean, setOnBoolean] = useState(false);

  return (
    <>
      <TestInput onBoolean={onBoolean} key={onBoolean} />
      <button onClick={() => setOnBoolean(!onBoolean)}>reset</button>
    </>
  );
};

const TestInput = ({ onBoolean }) => {
  const [onInput, setOnInput] = useState("");

  return (
    <>
      <input value={onInput} onChange={(e) => setOnInput(e.target.value)} />
    </>
  );
};

export default Test7;
