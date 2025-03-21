import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "../assets/images/login-screen.png";
import InputText from "./components/InputText";
import axios from "axios";

export default function index() {
  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [password, setPassword] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    await axios
      .post("http://10.0.2.2:8000/auth/login", { email, password })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        showErrorInput(err.response.data.message);
        console.log(`${err.response.data.message}`);
      });
  };

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
    setPasswordErrorMessage("");
  };

  const showErrorInput = (errorMessage: string) => {
    setHasEmailError(true);
    setEmailErrorMessage("");
    setHasPasswordError(true);
    setPasswordErrorMessage(errorMessage);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Image
          source={image}
          style={styles.image}
          contentFit="contain"
          transition={500}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <InputText
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          errorMessage={emailErrorMessage}
          hasError={hasEmailError}
          hideErrorMessage={true}
          onChangeText={onEmailChange}
        />
        <InputText
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          errorMessage={passwordErrorMessage}
          hasError={hasPasswordError}
          onChangeText={onPasswordChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgetPassword} onPress={handleLogin}>
          <Text style={styles.forgetPasswordText}>Forget password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    width: "auto",
    height: 350,
  },
  form: {
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  input: {
    height: 50,
    // backgroundColor: "#F5F5F5",
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#0068FF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgetPassword: {
    paddingVertical: 14,
    marginTop: 10,
    alignItems: "center",
  },
  forgetPasswordText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
