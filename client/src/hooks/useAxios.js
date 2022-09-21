import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async (option) => {
    setLoading(true);
    try {
      if (option === undefined) {
        const res = await axios.post(url);
        setProductList(res.data.productInfo);
      } else {
        const res = await axios.post(url, option);
        if (option.readMore === true) {
          setProductList((item) => [...item, ...res.data.productInfo]);
        } else {
          setProductList(res.data.productInfo);
        }
      }
      setLoading(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { productList, loading, getProduct };
};

export default useAxios;
