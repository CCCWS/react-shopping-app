import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  const connectServer = async (option) => {
    try {
      if (option === undefined) {
        setLoading(true);
        const res = await axios.get(url);
        setResData(res.data);
      } else {
        if (option.readMore === true) {
          const res = await axios.post(url, option);
          setResData((item) => [...item, ...res.data]);
        } else {
          setLoading(true);
          const res = await axios.post(url, option);
          setResData(res.data);
        }
      }
      setLoading(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  return { resData, setResData, loading, setLoading, connectServer };
};

export default useAxios;
