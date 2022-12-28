import React from "react";
import { Slide } from "react-awesome-reveal";

const ZoomAnimation = ({ children }) => {
  return (
    <>
      {children && (
        <Slide duration={1000} triggerOnce={true}>
          {children}
        </Slide>
      )}
    </>
  );
};

export default React.memo(ZoomAnimation);
