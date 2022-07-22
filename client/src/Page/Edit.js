import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import Loading from "../Components/Loading";
import UploadForm from "../Components/UploadForm";

function Edit({ user }) {
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

  return (
    <div className="page">
      {loading ? (
        <Loading />
      ) : (
        <UploadForm user={user} edit={true} editData={product} id={state.id} />
      )}
    </div>
  );
}

export default Edit;
