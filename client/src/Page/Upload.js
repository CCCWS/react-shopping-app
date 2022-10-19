import UploadForm from "../Components/UploadForm/UploadForm";

function Upload({ isAuth, userId }) {
  return <>{isAuth && <UploadForm userId={userId} />}</>;
}

export default Upload;
