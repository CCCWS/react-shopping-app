import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../Components/UploadForm/UploadForm";

function Upload({ user }) {
  const nav = useNavigate();

  useEffect(() => {
    if (!user.isAuth) {
      nav("/");
    }
  }, []);
  return <UploadForm user={user} />;
}

export default Upload;
