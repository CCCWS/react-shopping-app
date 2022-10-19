import { useCallback, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [resData, setResData] = useState();
  const [lastData, setLastData] = useState(false);
  const [loading, setLoading] = useState(true);

  const connectServer = useCallback(
    async (option) => {
      try {
        if (option === undefined) {
          setLoading(true);
          const res = await axios.get(url);
          setResData(res.data);
        } else {
          if (option.readMore === true) {
            const res = await axios.post(url, option);
            setResData((item) => [...item, ...res.data]);
            if (res.data.length === 0) {
              setLastData(true);
            }
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
    },
    [url]
  );

  return { resData, setResData, loading, setLoading, lastData, connectServer };
};

export default useAxios;
