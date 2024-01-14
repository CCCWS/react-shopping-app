import { useEffect, useState } from "react";

const useObserver = (userRef, threshold, onlyOnce) => {
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (!userRef.current) return;

    const observerCb = (entry) => {
      if (entry[0].isIntersecting) return setIsView(true);
      return setIsView(false);
    };

    const option = {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };

    const observer = new IntersectionObserver(observerCb, option);

    observer.observe(userRef.current);

    if (onlyOnce && isView) {
      observer.unobserve(userRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [userRef, threshold, isView, onlyOnce]);

  return { isView };
};

export default useObserver;
