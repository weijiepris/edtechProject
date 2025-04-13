// socket.ts
import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { User, Chat, ChatMessage } from '../models';

const onlineUsers = new Map<string, string>(); // userId -> socket.id

const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.headers.authorization?.split(' ')[1];
      if (!token) return next(new Error('No token'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { uuid: string };
      socket.data.userId = decoded.uuid;

      return next();
    } catch (err) {
      return next(new Error('Auth failed'));
    }
  });

  io.on('connection', socket => {
    const userId: string = socket.data.userId;
    onlineUsers.set(userId, socket.id);

    // Fetch chats this user is involved in
    socket.on('get_chats', async () => {
      try {
        const user = await User.findOneOrFail({ where: { uuid: userId } });

        const chats = await Chat.find({
          where: [{ userA: { uuid: userId } }, { userB: { uuid: userId } }],
          relations: ['userA', 'userB', 'messages']
        });

        const formatted = chats.map(chat => {
          const otherUser = chat.userA.uuid === userId ? chat.userB : chat.userA;
          const lastMessage = chat.messages?.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];

          return {
            chatId: chat.uuid,
            withUser: {
              uuid: otherUser.uuid,
              firstName: otherUser.firstName,
              lastName: otherUser.lastName
            },
            lastMessage: lastMessage
              ? {
                  content: lastMessage.content,
                  createdAt: lastMessage.createdAt
                }
              : null
          };
        });

        socket.emit('chats_list', formatted);
      } catch (err) {
        console.error('Error fetching chats:', err);
        socket.emit('chats_list', []);
      }
    });
    socket.on('get_messages', async ({ chatId }) => {
      try {
        console.log('here', chatId);
        const chat = await Chat.findOneOrFail({
          where: {
            uuid: chatId,
            userA: { uuid: userId }
          },
          relations: {
            userA: true,
            userB: true
          }
        });

        const messages = await ChatMessage.find({
          where: { chat: { uuid: chatId } },
          relations: { sender: true, chat: true },
          order: { createdAt: 'ASC' }
        });

        // Return messages to the requesting socket only

        const otherUser = chat.userA.uuid === userId ? chat.userB : chat.userA;
        const lastMessage = chat.messages?.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        socket.emit('chat_messages', {
          messages,
          chat: {
            chatId: chat.uuid,
            withUser: {
              uuid: otherUser.uuid,
              firstName: otherUser.firstName,
              lastName: otherUser.lastName
            },
            lastMessage: lastMessage
              ? {
                  content: lastMessage.content,
                  createdAt: lastMessage.createdAt
                }
              : null
          }
        });
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        socket.emit('chat_messages', []); // fallback empty
      }
    });
    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      io.emit('user_offline', { userId });
    });

    socket.on('get_online_status', ({ userId: targetId }) => {
      const isOnline = onlineUsers.has(targetId);
      socket.emit('online_status', { userId: targetId, isOnline });
    });
  });

  return io;
};

export default setupSocket;
