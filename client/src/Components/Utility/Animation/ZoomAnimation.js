import React from "react";
import { Zoom } from "react-awesome-reveal";

const ZoomAnimation = ({ children }) => {
  return (
    <>
      {children && (
        <Zoom duration={1000} triggerOnce={true}>
          {children}
        </Zoom>
      )}
    </>
  );
};

export default React.memo(ZoomAnimation);
