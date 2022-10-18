import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import Loading from "../Components/Utility/Loading";
import UploadForm from "../Components/UploadForm/UploadForm";

import useAxios from "../hooks/useAxios";

function Edit({ isAuth, userId }) {
  const nav = useNavigate();
  const { state } = useLocation(); //상품 id

  const {
    resData: product,
    loading,
    connectServer,
  } = useAxios("/api/product/productDetail");

  useEffect(() => {
    if (state === null) {
      nav("/");
    }

    if (isAuth) {
      connectServer({
        id: state.id,
        edit: true,
      });
    }
  }, []);

  return (
    <div className="page">
      {loading ? (
        <Loading />
      ) : (
        <UploadForm
          userId={userId}
          edit={true}
          editData={product}
          productId={state.id}
        />
      )}
    </div>
  );
}

export default Edit;
