import { useEffect } from "react";
import { useLocation } from "react-router";

import Loading from "../Components/Loading";
import UploadForm from "../Components/UploadForm/UploadForm";

import useAxios from "../hooks/useAxios";

function Edit({ user }) {
  const { state } = useLocation();

  const {
    resData: product,
    loading,
    connectServer,
  } = useAxios("/api/product/productDetail");

  useEffect(() => {
    connectServer({
      id: state.id,
      edit: true,
    });
  }, []);

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