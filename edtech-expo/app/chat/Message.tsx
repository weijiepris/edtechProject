import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Message = () => {
  const router = useExpoRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push('/message');
      }}
    >
      <View style={styles.profileIcon}></View>
      <View style={styles.message}>
        <Text style={styles.name}>Jovia Cheng</Text>
        <Text numberOfLines={1} style={styles.text}>
          Let's meet up to discuss! adsfasdf asdf asdf asdf
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    padding: 30,
    gap: 20,
  },
  profileIcon: {
    height: 48,
    width: 48,
    backgroundColor: '#E1E1E1',
    borderRadius: 100,
  },
  name: {
    fontWeight: 'bold',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: 250,
  },
  text: {
    maxWidth: 200,
    color: 'gray',
  },
});
