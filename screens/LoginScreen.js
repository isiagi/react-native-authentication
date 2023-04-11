import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuth, setIsAuth] = useState(false);

  const authCtx = useContext(AuthContext)

  async function loginHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "Authentication failed!, Could not log you in, please check credientials or try again later"
      );
      setIsAuth(false);
    }
  }

  if (isAuth) {
    return <LoadingOverlay message="LoggingIn user..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
