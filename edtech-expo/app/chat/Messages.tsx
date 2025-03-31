import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Message from './Message';

const Messages = () => {
  console.log("re rendering")
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Message />
        <View style={styles.divider}></View>
        <Message />
        <View style={styles.divider}></View>
        <Message />
        <View style={styles.divider}></View>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    backgroundColor: '#FFF',
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  divider: {
    width: 310,
    height: 1,
    alignSelf: 'center',
    borderColor: '#D9D9D9',
  },
});
