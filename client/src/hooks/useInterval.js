import { useEffect, useRef } from "react";

const useInterval = (cb, delay) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      savedCallback.current();
    };

    const interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, [delay]);
};

export default useInterval;
