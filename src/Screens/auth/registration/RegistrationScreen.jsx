import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { styles } from './RegistrationScreenStyle';
import AddIcon from '../../../../assets/images/addicon.svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../../redux/auth/authOperations';
import { selectError } from '../../../redux/auth/authSelectors';
import { updateError } from '../../../redux/auth/authReducer';

export default function RegistrationScreen({ navigation }) {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [onFocus, setOnFocus] = useState({
    login: false,
    email: false,
    pass: false,
  });

  const toggleFocus = (input, isFocus) => {
    setOnFocus(state => ({
      ...state,
      [input]: isFocus,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateError());
    if (!name || !email || !password) return Alert.alert('You have empty field(s)');
    dispatch(signUpUser({ name, userEmail: email, password }));
  };

  const navigateToSignInScreen = () => {
    setEmail('');
    setName('');
    setPassword('');
    dispatch(updateError());
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (error) return Alert.alert('Error', error);
  }, [error]);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => setIsShownKeyboard(true));
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => setIsShownKeyboard(false));
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../../../assets/images/registerBG.png')}
        style={styles.bgImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <View style={styles.userIcon}>
              <AddIcon style={styles.addIcon} width={25} height={25} />
            </View>
            <Text style={styles.formTitle}>Registration</Text>
            <View
              style={{
                ...styles.form,
                marginBottom: !isShownKeyboard ? 43 : 170,
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: !onFocus.login ? '#F6F6F6' : '#ffffff',
                  borderColor: !onFocus.login ? '#E8E8E8' : '#FF6C00',
                }}
                value={name}
                onChangeText={value => setName(value)}
                onFocus={() => toggleFocus('login', true)}
                onBlur={() => toggleFocus('login', false)}
                placeholder="Name"
                placeholderTextColor="#BDBDBD"
                cursorColor="#BDBDBD"
              />
              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: !onFocus.email ? '#F6F6F6' : '#ffffff',
                  borderColor: !onFocus.email ? '#E8E8E8' : '#FF6C00',
                }}
                value={email}
                onChangeText={value => setEmail(value)}
                onFocus={() => toggleFocus('email', true)}
                onBlur={() => toggleFocus('email', false)}
                placeholder="Email address"
                placeholderTextColor="#BDBDBD"
                cursorColor="#BDBDBD"
              />
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 0,
                    paddingRight: 70,
                    backgroundColor: !onFocus.pass ? '#F6F6F6' : '#ffffff',
                    borderColor: !onFocus.pass ? '#E8E8E8' : '#FF6C00',
                  }}
                  value={password}
                  onChangeText={value => setPassword(value)}
                  onFocus={() => toggleFocus('pass', true)}
                  onBlur={() => toggleFocus('pass', false)}
                  secureTextEntry={isSecurePass}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#BDBDBD"
                />
                <Text style={styles.showPass} onPress={() => setIsSecurePass(prevS => !prevS)}>
                  {isSecurePass ? 'show' : 'hide'}
                </Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginTop: 16 }}
              onPress={navigateToSignInScreen}
            >
              <Text style={styles.questionText}>
                Already have an account? <Text style={styles.loginText}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
