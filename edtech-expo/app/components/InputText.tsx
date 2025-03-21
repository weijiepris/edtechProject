import React from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
  errorMessage: string;
  hasError: boolean;
  hideErrorMessage?: boolean;
}

const InputText: React.FC<InputProps> = ({
  errorMessage,
  hasError,
  hideErrorMessage,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[styles.input, hasError && styles.inputError]}
        placeholderTextColor={hasError ? "#DA7676" : props.placeholderTextColor}
      />
      {hideErrorMessage ? null : errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  inputError: {
    borderColor: "#DA7676",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 16,
    color: "#DA7676",
  },
  errorMessage: {
    color: "#DA7676",
    paddingLeft: 10,
    fontSize: 14,
    marginTop: 4,
  },
});
