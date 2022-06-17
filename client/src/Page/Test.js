import React, { useState } from "react";
import { categoryList } from "../data/CatecoryList";
import SelectBox from "../Components/SelectBox";

function Test() {
  const [selectItem, setSelectItem] = useState("카테고리 선택");
  return (
    <div>
      <SelectBox
        data={categoryList}
        setValue={setSelectItem}
        value={selectItem}
      />
    </div>
  );
}

export default Test;
