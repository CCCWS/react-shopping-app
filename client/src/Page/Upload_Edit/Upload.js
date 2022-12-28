import UploadForm from "../../Components/UploadForm/UploadForm";
import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";

function Upload({ isAuth, userId }) {
  return (
    <>
      {isAuth && (
        <FadeAnimation>
          <UploadForm userId={userId} />
        </FadeAnimation>
      )}
    </>
  );
}

export default Upload;
