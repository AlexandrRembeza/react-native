import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/auth/registration/RegistrationScreen";
import LoginScreen from "./Screens/auth/login/LoginScreen";
import HomeScreen from "./Screens/main/home/HomeScreen";

const { Navigator, Screen } = createStackNavigator();

const useRoute = () => (
  <Navigator
    initialRouteName="Registration"
    screenOptions={{ headerShown: false }}
  >
    <Screen name="Registration" component={RegistrationScreen} />
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Home" component={HomeScreen} />
  </Navigator>
);

export default useRoute;
