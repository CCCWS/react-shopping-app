import React, { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

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

  useEffect(() => {
    // fetchApi();
    // axiosApi();
    test();
  }, [fetchApi, axiosApi, test]);

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
