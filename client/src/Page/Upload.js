import UploadForm from "../Components/UploadForm/UploadForm";

function Upload({ isAuth }) {
  return <>{isAuth && <UploadForm />}</>;
}

export default Upload;
