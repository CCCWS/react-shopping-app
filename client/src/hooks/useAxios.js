import { useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async (option) => {
    try {
      if (option === undefined) {
        setLoading(true);
        const res = await axios.post(url);
        setResData(res.data.productInfo);
      } else {
        if (option.readMore === true) {
          const res = await axios.post(url, option);
          setResData((item) => [...item, ...res.data.productInfo]);
        } else {
          setLoading(true);
          const res = await axios.post(url, option);
          setResData(res.data.productInfo);
        }
      }
      setLoading(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  const postAxios = async (option) => {
    try {
      if (option === undefined) {
        const res = await axios.post(url);
      } else {
        const res = await axios.post(url, option);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return { resData, loading, getProduct, postAxios };
};

export default useAxios;
