import UploadForm from "../../Components/UploadForm/UploadForm";
import ZoomAnimation from "../../Components/Utility/Animation/ZoomAnimation";

function Upload({ isAuth, userId }) {
  return (
    <>
      {isAuth && (
        <ZoomAnimation>
          <UploadForm userId={userId} />
        </ZoomAnimation>
      )}
    </>
  );
}

export default Upload;
