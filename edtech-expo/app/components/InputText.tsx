import React from 'react';
import { TextInput, StyleSheet, Text, View, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  errorMessage?: string;
  hasError?: boolean;
  hideErrorMessage?: boolean;
  showIcon?: boolean;
  style?: any;
  placeholder?: string;
  renderIcon?: () => React.ReactNode;
}

const InputText: React.FC<InputProps> = ({
  errorMessage,
  hasError,
  hideErrorMessage,
  showIcon,
  renderIcon,
  placeholder,
  style,
  ...props
}) => {
  return (
    <View>
      <View style={[styles.textboxWrapper, hasError && styles.inputError, style]}>
        <TextInput
          {...props}
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={hasError ? '#DA7676' : '#999'}
        />
        {showIcon && renderIcon && <View style={styles.icon}>{renderIcon()}</View>}
      </View>
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
  textboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginLeft: 8,
  },
  inputError: {
    borderColor: '#DA7676',
  },
  errorMessage: {
    color: '#DA7676',
    paddingLeft: 10,
    fontSize: 14,
    marginTop: 4,
  },
});
