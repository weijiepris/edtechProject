import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit profile</Text>
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
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  }
});
