import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductRank.css";

function ProductRank() {
  const [sold, setSold] = useState([]);
  const [views, setViews] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const getSold = await axios.post("api/product/viewSort");
      const getViews = await axios.post("api/product/soldSort");

      setSold(getSold.data.productInfo);
      setViews(getViews.data.productInfo);
    } catch (err) {
      console.log(err, "조회실패");
    }
  };

  console.log(sold);
  console.log(views);

  return <div className="ProductRank">ProductRank</div>;
}

export default ProductRank;
