import { useState, useEffect, useRef } from "react";

function Test() {
  const [hideElement, setHideElement] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, [scrollRef.current]);

  const yScrollEvent = () => {
    const scroll = scrollRef.current.getBoundingClientRect();
    console.log(scroll);
    setHideElement(scroll.top <= -1000);
  };

  return (
    <div style={{ height: "300vh", background: "#eee" }} ref={scrollRef}>
      {!hideElement && (
        <div style={{ position: "fixed", background: "#fff" }}>
          <span>스크롤을 일정 수치만큼 내리면 이 영역은 사라집니다!</span>
        </div>
      )}
    </div>
  );
}

export default Test;
