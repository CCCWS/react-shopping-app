import { useState } from "react";

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [contents, setContents] = useState({ title: "", message: "" });

  return { openModal, contents, setOpenModal, setContents };
};

export default useModal;
