import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../assets/images/login-screen.png';
import InputText from '@/app/components/InputText';
import { handleRegister } from '../services/Register.service';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { useAuth } from '../hooks/useAuth';

interface IRegister {}

const Register: React.FC<IRegister> = ({}) => {
  const { validateToken } = useAuth();
  const router = useExpoRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [hasFieldError, setHasFieldError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [hasPasswordError, setHasPasswordError] = useState(false);

  const resetError = () => {
    setHasFieldError(false);
    setHasPasswordError(false);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !age || !email || !password || !confirmPassword) {
      setHasFieldError(true);
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setHasPasswordError(true);
      setErrorMessage('Passwords do not match');
      return;
    }

    handleRegister({
      firstName,
      lastName,
      age: parseInt(age, 10),
      email,
      password,
      validateToken,
      onError: setErrorMessage,
      router,
    });
  };

  return (
    <ScrollView style={styles.body}>
      <View>
        <Image source={image} style={styles.image} contentFit="contain" transition={500} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>

        <InputText
          placeholder="First Name"
          value={firstName}
          onChangeText={val => {
            setFirstName(val);
            resetError();
          }}
          hasError={hasFieldError}
          errorMessage=""
          hideErrorMessage
        />
        <InputText
          placeholder="Last Name"
          value={lastName}
          onChangeText={val => {
            setLastName(val);
            resetError();
          }}
          hasError={hasFieldError}
          errorMessage=""
          hideErrorMessage
        />
        <InputText
          placeholder="Age"
          value={age}
          keyboardType="numeric"
          onChangeText={val => {
            setAge(val);
            resetError();
          }}
          hasError={hasFieldError}
          errorMessage=""
          hideErrorMessage
        />
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={val => {
            setEmail(val);
            resetError();
          }}
          hasError={hasFieldError}
          errorMessage=""
          hideErrorMessage
        />
        <InputText
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={val => {
            setPassword(val);
            resetError();
          }}
          hasError={hasFieldError || hasPasswordError}
          errorMessage=""
          hideErrorMessage
        />
        <InputText
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={val => {
            setConfirmPassword(val);
            resetError();
          }}
          hasError={hasFieldError || hasPasswordError}
          errorMessage={errorMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgetPassword} onPress={() => router.replace('/login')}>
          <Text style={styles.forgetPasswordText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;

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
    gap: 16,
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
