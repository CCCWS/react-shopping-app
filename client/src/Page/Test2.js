import React, { useEffect } from "react";

function Test2() {
  useEffect(() => {
    test1();
    test2();
  }, []);

  const test1 = () => {
    for (let i = 0; i <= 1000; i++) {
      console.log("test");
    }
  };

  const test2 = () => {
    console.time("Performance Time");
    setTimeout(() => console.log("3초후"), 3000);
    console.timeEnd("Performance Time");
  };

  return <div>Test2</div>;
}

export default Test2;
