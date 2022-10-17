import UploadForm from "../Components/UploadForm/UploadForm";
import useAuth from "../hooks/useAuth";

function Upload() {
  const { isAuth } = useAuth(true);
  return <>{isAuth && <UploadForm />}</>;
}

export default Upload;
