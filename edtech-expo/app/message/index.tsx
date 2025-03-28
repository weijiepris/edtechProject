import React from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import MessageContent from './MessageContent';
import SendMessage from './SendMessage';

const Message = () => {
  const router = useExpoRouter();
  return (
    <View>
      <Header router={router} />
      <MessageContent />
      <SendMessage />
    </View>
  );
};

export default Message;
