import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import Loading from "../Components/Loading";
import UploadForm from "../Components/UploadForm/UploadForm";

import useAxios from "../hooks/useAxios";
import userData from "../_reducers/user_reducer";

function Edit({ user }) {
  const nav = useNavigate();
  const { state } = useLocation();

  const {
    resData: product,
    loading,
    connectServer,
  } = useAxios("/api/product/productDetail");

  useEffect(() => {
    if (state === null) {
      nav("/");
    }
    if (user.isAuth === false) {
      nav("/");
    }
    if (user.isAuth === true) {
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
        <UploadForm user={user} edit={true} editData={product} id={state.id} />
      )}
    </div>
  );
}

export default Edit;
