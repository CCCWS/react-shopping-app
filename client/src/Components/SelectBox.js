import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import "./SelectBox.css";

function SelectBox({ data, value, setValue, setSelectCategort, main }) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [click, setClick] = useState(false);

  const open = () => {
    setClick(!click);
  };

  const select = (e) => {
    if (main === true) {
      setSelectCategort(e.target.innerText);
    } else {
      setValue(e);
    }

    setClick(!click);
  };

  const clickOutside = ({ target }) => {
    if (
      click &&
      !selectRef1.current.contains(target) &&
      !selectRef2.current.contains(target)
    )
      setClick(false);
  };

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [click]);

  return (
    <div className="SelectBox" onClick={open} ref={selectRef1}>
      {value}
      <div className="caret-filled">
        {click ? <CaretUpFilled /> : <CaretDownFilled />}
      </div>
      <ul
        className={[
          `select-value ${click ? "select-value-open" : "select-value-close"}`,
        ].join(" ")}
        onChange={select}
        ref={selectRef2}
      >
        {main === true && (
          <li
            onClick={select}
            className="select-value-list"
            id="category"
          >
            전체
          </li>
        )}
        {data.map((item) => (
          <li
            onClick={select}
            key={item.id}
            className="select-value-list"
            id="category"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(SelectBox);
