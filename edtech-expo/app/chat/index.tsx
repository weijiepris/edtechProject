import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Socket } from 'socket.io-client';
import Messages from './Messages';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { connectSocket, disconnectSocket } from '../config/socket';

export default function ChatScreen() {
  const [socket, setSocket] = useState<Socket | null>(null);

  const onSearch = (value: string) => {};

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

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={() => <SearchBar onSearch={onSearch} />} />
      <Messages socket={socket} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
