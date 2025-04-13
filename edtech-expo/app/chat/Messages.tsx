import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Message from './Message';
import { Socket } from 'socket.io-client';
import { IChatPreview } from '../utils/constants';

interface MessagesProps {
  socket: Socket | null;
}

const Messages: React.FC<MessagesProps> = ({ socket }) => {
  const [chats, setChats] = useState<IChatPreview[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('get_chats');

    socket.on('chats_list', (data: IChatPreview[]) => {
      console.log('from socket, fetched chats', data);
      setChats(data);
    });

    return () => {
      socket.off('chats_list');
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {chats.map(chat => (
          <Message key={chat.chatId} chatDetails={chat} />
        ))}
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
