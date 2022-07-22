import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import Loading from "../Components/Loading";

function Edit() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await axios.post("/api/product/productDetail", {
      id: state.id,
    });
    setProduct(res.data.productInfo);
    setLoading(false);
  };

  console.log(product);

  return <div className="page">{loading ? <Loading /> : <div>test</div>}</div>;
}

export default Edit;
