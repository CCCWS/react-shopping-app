import { useCallback, useState } from "react";
import newAxios from "../productionCheck";

const useAxios = (url) => {
  const [resData, setResData] = useState();
  const [lastData, setLastData] = useState(false);
  const [loading, setLoading] = useState(true);

  const connectServer = useCallback(
    async (option) => {
      try {
        if (option === undefined) {
          setLoading(true);
          const res = await newAxios.get(url);
          setResData(res.data);
        }

        if (option) {
          if (option.readMore === true) {
            const res = await newAxios.post(url, option);
            setResData((item) => [...item, ...res.data]);

            if (res.data.length === 0) {
              setLastData(true);
              console.log("last data");
            }
          } else {
            setLoading(true);
            const res = await newAxios.post(url, option);
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

  return {
    resData,
    setResData,
    loading,
    setLoading,
    lastData,
    setLastData,
    connectServer,
  };
};

export default useAxios;
