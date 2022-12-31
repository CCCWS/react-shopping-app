import React, { useState, useEffect } from "react";

const Test7 = () => {
  // const [onInput, setOnInput] = useState("");
  const [onBoolean, setOnBoolean] = useState(false);

  // useEffect(() => {
  //   setOnInput("");
  //   console.log("reset");
  // }, [onBoolean]);

  return (
    <>
      <TestInput onBoolean={onBoolean} key={onBoolean} />
      <button onClick={() => setOnBoolean(!onBoolean)}>reset</button>
    </>
  );
};

const TestInput = ({ onBoolean }) => {
  const [onInput, setOnInput] = useState("");

  console.log(onBoolean);

  return (
    <>
      <input value={onInput} onChange={(e) => setOnInput(e.target.value)} />
    </>
  );
};

export default Test7;
