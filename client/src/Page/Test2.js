import React, { useEffect } from "react";

function Test2() {
  useEffect(() => {
    main();
  }, []);

  function handleTask(id) {
    return new Promise((resolve) => {
      console.log(`task${id} finished!`);
      resolve();
    });
  }

  async function main() {
    const tasks = [1, 2, 3, 4, 5];

    const taskPromises = tasks.map((task) => handleTask(task));
    const result = await Promise.all(taskPromises);
    console.log(result);
  }
  return <div>Test2</div>;
}

export default Test2;
