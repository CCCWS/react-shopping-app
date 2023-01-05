import React, { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import styled from "styled-components";

const Test7 = () => {
  const [onBoolean, setOnBoolean] = useState(false);

  // function work(callback) {
  //   setTimeout(() => {
  //     const start = Date.now();
  //     for (let i = 0; i < 1000000000; i++) {}
  //     const end = Date.now();
  //     console.log(end - start + "ms");
  //     callback("test");
  //   }, 0);
  // }

  // console.log("작업 시작!");
  // work((res) => {
  //   console.log(res);
  // });
  // console.log("다음 작업");

  // function findUserAndCallBack(id, cb) {
  //   const user = {
  //     id: id,
  //     name: "User" + id,
  //     email: id + "@test.com",
  //   };
  //   cb(user);
  // }

  // findUserAndCallBack(1, (user) => {
  //   console.log("user:", user);
  // });

  let sueccess = "성공";
  let fail = "실패";
  let num = 2;

  const findUser = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = {
          id: id,
          name: "User" + id,
          email: id + "@test.com",
        };
        // test = "변경후";

        if (id) resolve(sueccess);
        if (id === undefined) reject(new Error(fail));
      }, 1000);
    });
  };

  // findUser()
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => console.log(err));

  const fetchApi = useCallback(() => {
    fetch("/api/product/productDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "62bc572a1973d6509eb5f89b",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const test = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((a) => a.json()) // b
      .then((b) => b.userId) // c
      .then((c) => "https://jsonplaceholder.typicode.com/users/" + c) // d
      .then((d) => fetch(d)) // e
      .then((e) => e.json()) // f
      .then((f) => console.log(f))
      .catch((error) => console.log("error:", error));
  }, []);

  const axiosApi = useCallback(async () => {
    try {
      const res = await axios.post("/api/product/productDetail", {
        id: "62bc572a1973d6509eb5f89b",
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchAuthorName = useCallback((postId) => {
    console.log("데이터1");
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((post) => post.userId)
      .then((userId) => {
        console.log("데이터2");
        return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((response) => response.json())
          .then((user) => user.name);
      });
  }, []);

  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  const asyncFunc = useCallback(async (postId) => {
    const product = await axios.post("/api/product/productDetail", {
      id: postId,
    });

    setData1(product.data);

    const PRODUCT_ID = product._id;
    const PRODUCT_CATEGORY = product.category;

    // const otherProduct = await axios.post("/api/product/productList", {
    //   filterId: productId,
    //   category: productCategory,
    // });

    // const otherProduct2 = await axios.post("/api/product/productList", {
    //   filterId: productId,
    //   category: productCategory,
    // });

    // setData2(otherProduct.data);
    test2(PRODUCT_ID, PRODUCT_CATEGORY);
    test3(PRODUCT_ID, PRODUCT_CATEGORY);

    console.log("test");
  }, []);

  const test2 = async (productId, productCategory) => {
    const otherProduct = await axios.post("/api/product/productList", {
      filterId: productId,
      category: productCategory,
    });
    setData2(otherProduct.data);
  };

  const test3 = async (productId, productCategory) => {
    const otherProduct = await axios.post("/api/product/productList", {
      filterId: productId,
      category: productCategory,
    });
    setData2(otherProduct.data);
  };

  useEffect(() => {
    // fetchApi();
    // axiosApi();
    // test();
    // fetchAuthorName(1).then((name) => console.log(name));
    // asyncFunc("62bc572a1973d6509eb5f89b");
  }, [asyncFunc, fetchAuthorName, fetchApi, axiosApi, test]);

  useEffect(() => {
    if (data1) console.log(data1);
  }, [data1]);

  useEffect(() => {
    if (data2) console.log(data2);
  }, [data2]);

  return (
    <>
      <TestInput onBoolean={onBoolean} key={onBoolean} />
      <button onClick={() => setOnBoolean(!onBoolean)}>reset</button>
    </>
  );
};

const TestInput = ({ onBoolean }) => {
  const [onInput, setOnInput] = useState("");

  return (
    <>
      <input value={onInput} onChange={(e) => setOnInput(e.target.value)} />
    </>
  );
};

export default Test7;
