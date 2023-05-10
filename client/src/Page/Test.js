import React, { useEffect } from "react";
import axios from "axios";
import newAxios from "../productionCheck";

const Test = () => {
  useEffect(() => {
    const api = async () => {
      // const res = await axios.post("/api/product/productDetail", {
      //   id: "62bc572a1973d6509eb5f89b",
      // });
      // const res = await axios.get(
      //   "https://jsonplaceholder.typicode.com/todos/1"
      // );

      const postUrl = process.env.NODE_ENV === "production" ? "/ec2server" : "";

      const res = await newAxios.get(`/api/test`);

      console.log(res);
    };

    api();
  }, []);

  return <></>;
};

export default Test;
