import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessageContent from './MessageContent';
import SendMessage from './SendMessage';
import Header from '../components/Header';
import { IChatMessage, IChatPreview, OnlineStatus, OnlineStatusMapping } from '../utils/constants';
import { useLocalSearchParams } from 'expo-router';
import { connectSocket, disconnectSocket } from '../config/socket';
import { Socket } from 'socket.io-client';

const Message = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [chat, setChat] = useState<IChatPreview>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>(OnlineStatus.OFFLINE);

  useEffect(() => {
    const init = async () => {
      const connectedSocket = await connectSocket();
      setSocket(connectedSocket);
    };

    init();

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!socket || !chatId) return;

    socket.emit('get_messages', { chatId });

    socket.on('chat_messages', (data: { messages: IChatMessage[]; chat: IChatPreview }) => {
      setChat(data.chat);
      setMessages(data.messages);
    });

    socket.on('receive_message', (newMessage: IChatMessage) => {
      if (newMessage.chatId === chatId) {
        setMessages(prev => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off('chat_messages');
      socket.off('receive_message');
    };
  }, [socket, chatId]);

  useEffect(() => {
    if (!socket || !chatId) return;

    socket.emit('get_online_status', { userId: chat?.withUser.uuid });

    socket.on('online_status', ({ userId, isOnline }) => {
      setOnlineStatus(isOnline ? OnlineStatus.ONLINE : OnlineStatus.OFFLINE);
    });
  }, [socket, chat]);

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
              <Text
                style={styles.text}
              >{`${chat?.withUser.firstName} ${chat?.withUser.lastName}`}</Text>
              <Text style={[styles.text, getOnlineStatusStyling(onlineStatus)]}>
                {OnlineStatusMapping.get(onlineStatus)}
              </Text>
            </View>
          </View>
        )}
      />
      <MessageContent messages={messages} />
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
