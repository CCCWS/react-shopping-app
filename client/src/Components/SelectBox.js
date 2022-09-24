import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import "./SelectBox.css";

function SelectBox({ data, setData, edit, initData }) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [title, setTitle] = useState(data[0].name);
  const [click, setClick] = useState(false);

  const open = () => {
    setClick(!click);
  };

  const select = (e) => {
    setTitle(e.target.innerText);
    setData(e.target.id);
    setClick(!click);
  };

  useEffect(() => {
    const clickOutside = ({ target }) => {
      if (
        click &&
        !selectRef1.current.contains(target) &&
        !selectRef2.current.contains(target)
      )
        setClick(false);
    };

    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [click]);

  useEffect(() => {
    if (edit) setTitle(initData);
  }, []);

  return (
    <div className="SelectBox" onClick={open} ref={selectRef1}>
      {title}
      <div className="caret-filled">
        {click ? <CaretUpFilled /> : <CaretDownFilled />}
      </div>
      <ul
        className={[
          `select-value ${click ? "select-value-open" : "select-value-close"}`,
        ]}
        onChange={select}
        ref={selectRef2}
      >
        {data.map((item) => (
          <li
            onClick={select}
            key={item.id}
            className="select-value-list"
            id={item.value}
            test="test"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(SelectBox);
