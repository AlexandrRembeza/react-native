import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { styles } from "./LoginScreenStyle";
import { useState, useEffect } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [onFocus, setOnFocus] = useState({
    email: false,
    pass: false,
  });

  const toggleFocus = (input, isFocus) => {
    setOnFocus((state) => ({
      ...state,
      [input]: isFocus,
    }));
  };

  const handleSubmit = () => {
    if (!email || !password) return Alert.alert("You have empty field(s)");
    Alert.alert("User Data", `${email} ${password}`);
  };

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () =>
      setIsShownKeyboard(true)
    );
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () =>
      setIsShownKeyboard(false)
    );
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../../assets/images/registerBG.png")}
        style={styles.bgImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Sign in</Text>
            <View
              style={{
                ...styles.form,
                marginBottom: !isShownKeyboard ? 43 : 105,
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: !onFocus.email ? "#F6F6F6" : "#ffffff",
                  borderColor: !onFocus.email ? "#E8E8E8" : "#FF6C00",
                }}
                value={email}
                onChangeText={(value) => setEmail(value)}
                onFocus={() => toggleFocus("email", true)}
                onBlur={() => toggleFocus("email", false)}
                placeholder="Email address"
                placeholderTextColor="#BDBDBD"
                cursorColor="#BDBDBD"
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 0,
                    paddingRight: 70,
                    backgroundColor: !onFocus.pass ? "#F6F6F6" : "#ffffff",
                    borderColor: !onFocus.pass ? "#E8E8E8" : "#FF6C00",
                  }}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  onFocus={() => toggleFocus("pass", true)}
                  onBlur={() => toggleFocus("pass", false)}
                  secureTextEntry={isSecurePass}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#BDBDBD"
                />
                <Text
                  style={styles.showPass}
                  onPress={() => setIsSecurePass((prevS) => !prevS)}
                >
                  {isSecurePass ? "show" : "hide"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <Text style={styles.registerText}>
              Don't have account? register
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
