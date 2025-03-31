import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessageContent from './MessageContent';
import SendMessage from './SendMessage';
import Header from '../components/Header';
import { OnlineStatus, OnlineStatusMapping } from '../utils/constants';

const Message = () => {
  const getOnlineStatusStyling = (value: OnlineStatus) => {
    switch (value) {
      case OnlineStatus.ONLINE:
        return { color: '#85CC86' };
      case OnlineStatus.OFFLINE:
        return { color: '#4D4D4D' };
    }
  };
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        renderMiddleSection={() => (
          <View style={styles.userDetailsContainer}>
            <View style={styles.profileIcon}></View>
            <View style={styles.userDetails}>
              <Text style={styles.text}>Jovia Cheng</Text>
              <Text style={[styles.text, getOnlineStatusStyling(OnlineStatus.ONLINE)]}>
                {OnlineStatusMapping.get(OnlineStatus.ONLINE)}
              </Text>
            </View>
          </View>
        )}
      />
      <MessageContent />
      <SendMessage />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  userDetailsContainer: {
    width: 250,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  userDetails: { justifyContent: 'center' },
  text: {
    fontWeight: 'bold',
  },
  profileIcon: {
    height: 48,
    width: 48,
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
  },
});
