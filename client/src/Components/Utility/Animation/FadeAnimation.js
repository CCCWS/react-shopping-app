import React from "react";
import { Fade } from "react-awesome-reveal";

const FadeAnimation = ({ children }) => {
  return (
    <>
      {children && (
        <Fade duration={1000} triggerOnce={true}>
          {children}
        </Fade>
      )}
    </>
  );
};

export default React.memo(FadeAnimation);
