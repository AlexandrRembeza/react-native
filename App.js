import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./src/route";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded || error) return null;
  const routing = useRoute();

  return <NavigationContainer>{routing}</NavigationContainer>;
}
