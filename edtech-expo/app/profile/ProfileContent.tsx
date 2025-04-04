import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputText from '../components/InputText';
import { handleLogout } from '../services/Auth.service';
import { useAuth } from '../hooks/useAuth';
import { IUser } from '../utils/constants';
import { updateProfile } from '../services/User.service';
import Toast from 'react-native-toast-message';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

interface IProfile {
  profile?: IUser;
}

const ProfileContent: React.FC<IProfile> = ({ profile }) => {
  const router = useExpoRouter();
  const { isAuthenticated, validateToken } = useAuth();

  const [firstName, setFirstName] = useState<string>(profile?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(profile?.lastName ?? '');
  const [age, setAge] = useState<number | string>(profile?.age ?? '');
  const [email, setEmail] = useState<string>(profile?.email ?? '');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setEmail(profile.email || '');
      setAge(profile.age || '');
    }
  }, [profile]);

  const onLogout = () => {
    handleLogout(validateToken);
  };

  const onUpdateProfile = () => {
    updateProfile({ age: Number(age), email, firstName, lastName }).then(() => {
      Toast.show({
        type: 'success',
        text1: 'Profile updated!',
        position: 'top',
      });
      router.replace('/dashboard');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Edit profile</Text>

        <Text>First name</Text>
        <InputText style={styles.input} value={firstName} onChangeText={setFirstName} />

        <Text>Last name</Text>
        <InputText style={styles.input} value={lastName} onChangeText={setLastName} />

        <Text>Age</Text>
        <InputText style={styles.input} value={String(age)} onChangeText={setAge} />

        <Text>Email</Text>
        <InputText style={styles.input} value={email} onChangeText={setEmail} />

        <TouchableOpacity style={styles.saveButton} onPress={onUpdateProfile}>
          <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changePasswordButton}>
          <Text style={styles.buttonText}>Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changePasswordButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
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
