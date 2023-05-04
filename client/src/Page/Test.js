import React, { useEffect } from "react";
import axios from "axios";

const Test = () => {
  useEffect(() => {
    const api = async () => {
      // const res = await axios.post("/api/product/productDetail", {
      //   id: "62bc572a1973d6509eb5f89b",
      // });
      const res = await axios.get("/api");
      console.log(res);
    };

    api();
  }, []);

  return <></>;
};

export default Test;
