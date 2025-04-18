import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/constants';

let socket: Socket | null = null;

export const connectSocket = async () => {
  const token = await AsyncStorage.getItem('token');

  socket = io(BASE_URL, {
    transports: ['websocket'],
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  socket.on('connect', () => {
    // console.log('WebSocket connected');
  });

  socket.on('disconnect', () => {
    // console.log('WebSocket disconnected');
  });

  socket.on('receive_message', message => {
    console.log('New message received:', message);
  });

  return socket;
};

export const sendMessage = (content: string, receiverId: string) => {
  if (socket) {
    socket.emit('send_message', { content, receiverId });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
