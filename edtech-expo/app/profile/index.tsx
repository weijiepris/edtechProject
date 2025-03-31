import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileContent from './ProfileContent';
import Header from '../components/Header';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={'PROFILE'} />
      <ProfileContent />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
});
