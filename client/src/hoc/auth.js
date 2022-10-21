import useAuth from "../hooks/useAuth";

const Auth = (Component, option) => {
  const AuthCheck = () => {
    const { isAuth, userId, darkMode } = useAuth(option);
    return <Component isAuth={isAuth} userId={userId} darkMode={darkMode} />;
  };
  return <AuthCheck />;
};

export default Auth;
