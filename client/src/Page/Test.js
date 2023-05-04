import React, { useEffect } from "react";
import axios from "axios";

const Test = () => {
  useEffect(() => {
    const api = async () => {
      // const res = await axios.post("/api/product/productDetail", {
      //   id: "62bc572a1973d6509eb5f89b",
      // });
      // const res = await axios.get(
      //   "https://jsonplaceholder.typicode.com/todos/1"
      // );

      const res = await axios.get("http://3.36.235.60:3000");

      console.log(res.data);
    };

    api();
  }, []);

  return <></>;
};

export default Test;
