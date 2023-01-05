import RegistrationScreen from "./Screens/auth/registration/RegistrationScreen";
import LoginScreen from "./Screens/auth/login/LoginScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded || error) return null;

  return (
    <>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </>
  );
}
