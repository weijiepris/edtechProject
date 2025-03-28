import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../assets/images/login-screen.png';
import InputText from '@/app/components/InputText';
import { handleLogin } from '@/app/services/Login.service';

interface ILogin {
  validateToken: Function;
}

const Login: React.FC<ILogin> = ({ validateToken }) => {
  const [email, setEmail] = useState('test@here.com');
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState('password');
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const onEmailChange = (value: string) => {
    setEmail(value);
    resetFields();
  };
  const onPasswordChange = (value: string) => {
    setPassword(value);
    resetFields();
  };

  const resetFields = () => {
    setHasEmailError(false);
    setHasPasswordError(false);
    setPasswordErrorMessage('');
  };

  const showErrorInput = (errorMessage: string) => {
    setHasEmailError(true);
    setEmailErrorMessage('');
    setHasPasswordError(true);
    setPasswordErrorMessage(errorMessage);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Image source={image} style={styles.image} contentFit="contain" transition={500} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          errorMessage={emailErrorMessage}
          hasError={hasEmailError}
          hideErrorMessage={true}
          onChangeText={onEmailChange}
        />
        <InputText
          placeholder="Password"
          secureTextEntry
          value={password}
          errorMessage={passwordErrorMessage}
          hasError={hasPasswordError}
          onChangeText={onPasswordChange}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin({ email, password, validateToken, fn: showErrorInput })}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgetPassword}>
          <Text style={styles.forgetPasswordText}>Forget password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    width: 'auto',
    height: 350,
  },
  form: {
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0068FF',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgetPassword: {
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  forgetPasswordText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
