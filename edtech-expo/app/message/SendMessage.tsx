import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import InputText from '../components/InputText';
import { EvilIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Socket } from 'socket.io-client';

interface SendMessageProps {
  socket: Socket | null;
  chatId: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ socket, chatId }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && socket && chatId) {
      socket.emit('send_message', {
        chatId,
        content: text.trim(),
      });
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <InputText
        style={styles.textbox}
        placeholder="Write message here..."
        value={text}
        onChangeText={setText}
        showIcon={true}
        renderIcon={() => <Ionicons name="attach" size={24} color="black" />}
      />
      <View style={styles.icons}>
        <FontAwesome name="microphone" size={32} color="black" />
        <TouchableOpacity onPress={handleSend}>
          <EvilIcons name="sc-telegram" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    height: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  textbox: { height: 100, width: 300 },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
    marginLeft: 10,
  },
});
