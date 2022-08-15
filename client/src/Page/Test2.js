import React, { useEffect } from "react";

function Test2() {
  return (
    <div>
      <label for="numbers">numbers</label>
      <input type="text" list="list" id="numbers" />
      <datalist id="list">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
        <option value="6" />
      </datalist>
    </div>
  );
}

export default Test2;
