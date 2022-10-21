import { useSelector } from "react-redux";

const useTheme = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return { darkMode };
};

export default useTheme;
