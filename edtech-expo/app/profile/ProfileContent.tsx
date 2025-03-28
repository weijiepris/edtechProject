import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputText from '../components/InputText';

const ProfileContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Edit profile</Text>
        <Text>First name</Text>
        <InputText style={styles.input} />
        <Text>Last name</Text>
        <InputText style={styles.input} />
        <Text>Username</Text>
        <InputText style={styles.input} />
        <Text>Email</Text>
        <InputText style={styles.input} />
        <Text>Phone number</Text>
        <InputText style={styles.input} />
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changePasswordButton}>
          <Text style={styles.buttonText}>Change password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileContent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
    backgroundColor: '#FFF',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 30,
  },
  inputContainer: {
    alignSelf: 'center',
    marginTop: 30,
    height: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: 239,
  },
  saveButton: {
    height: 33,
    backgroundColor: '#0068FF',
    padding: 5,
    borderRadius: 5,
  },
  changePasswordButton: {
    marginTop: 27,
    height: 33,
    backgroundColor: '#0044A6',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
