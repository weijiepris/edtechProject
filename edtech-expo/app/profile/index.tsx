import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import ProfileContent from './ProfileContent';

const Profile = () => {
  const router = useExpoRouter();
  return (
    <View style={styles.container}>
      <Header router={router} />
      <ProfileContent />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
});
