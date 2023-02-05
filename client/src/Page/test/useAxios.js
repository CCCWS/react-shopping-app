import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = ({ url, type, body }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!url) throw new Error("url empty");
  if (!type) throw new Error("type empty");
  if (type === "get" && body) throw new Error("body can not be used");
  if (type === "post" && !body) throw new Error("body empty");

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios[type](url, body && body);
        setApiData(res.data);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    };

    if (!loading) return;
    getApi();
  }, [url, type, body, loading]);

  return { apiData, loading };
};

export default useAxios;
