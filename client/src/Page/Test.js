import React, { useEffect } from "react";
import axios from "axios";

const Test = () => {
  useEffect(() => {
    const api = async () => {
      const res = await axios.post("/api/product/productDetail", {
        id: "62bc572a1973d6509eb5f89b",
      });
      console.log(res.data);
    };

    api();
  }, []);

  return <></>;
};

export default Test;
