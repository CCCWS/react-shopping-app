import useAuth from "../hooks/useAuth";

const Auth = (Component, option) => {
  const AuthCheck = () => {
    const { isAuth, userId } = useAuth(option);
    return <Component isAuth={isAuth} userId={userId} />;
  };
  return <AuthCheck />;
};

export default Auth;
