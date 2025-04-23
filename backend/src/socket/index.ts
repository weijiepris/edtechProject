import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { User, Chat, ChatMessage } from '../models';

const onlineUsers = new Map<string, string>();

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
    io.emit('user_online', { userId });

    socket.on('get_chats', async () => {
      try {
        await User.findOneOrFail({ where: { uuid: userId } });

        const chats = await Chat.find({
          where: [{ userA: { uuid: userId } }, { userB: { uuid: userId } }],
          relations: ['userA', 'userB', 'messages']
        });

        const formatted = chats.map(chat => {
          const currentUser = chat.userA.uuid === userId ? chat.userA : chat.userB;
          const otherUser = chat.userA.uuid === userId ? chat.userB : chat.userA;
          const lastMessage = chat.messages?.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];

          return {
            chatId: chat.uuid,
            currentUser: {
              uuid: currentUser.uuid,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName
            },
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
        const chat = await Chat.findOneOrFail({
          where: {
            uuid: chatId
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

        const currentUser = chat.userA.uuid === userId ? chat.userA : chat.userB;
        const otherUser = chat.userA.uuid === userId ? chat.userB : chat.userA;
        const lastMessage = chat.messages?.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        socket.emit('chat_messages', {
          messages,
          chat: {
            chatId: chat.uuid,
            currentUser: {
              uuid: currentUser.uuid,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName
            },
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
        socket.emit('chat_messages', []);
      }
    });
    socket.on('disconnect', () => {
      console.log('disconnected', userId);
      onlineUsers.delete(userId);
      io.emit('user_offline', { userId });
    });
    socket.on('get_online_status', async () => {
      const plainObject = Object.fromEntries(onlineUsers);

      socket.emit('online_status', { onlineUsers: plainObject });
    });
    socket.on('send_message', async ({ chatId, content }) => {
      try {
        const senderId = socket.data.userId;

        const chat = await Chat.findOneOrFail({
          where: { uuid: chatId },
          relations: { userA: true, userB: true }
        });

        const sender = await User.findOneOrFail({ where: { uuid: senderId } });

        const receiver = chat.userA.uuid === senderId ? chat.userB : chat.userA;

        const message = ChatMessage.create({
          chat,
          content,
          sender,
          receiverId: receiver.uuid
        });

        await message.save();

        chat.lastMessage = message;
        await chat.save();

        const formattedMessage = {
          uuid: message.uuid,
          chatId: chat.uuid,
          content: message.content,
          createdAt: message.createdAt,
          sender: {
            uuid: sender.uuid,
            firstName: sender.firstName,
            lastName: sender.lastName,
            email: sender.email,
            role: sender.role
          },
          receiverId: receiver.uuid
        };

        socket.emit('receive_message', formattedMessage);
        const receiverSocketId = onlineUsers.get(receiver.uuid);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', formattedMessage);
        }
      } catch (error) {
        console.error('Failed to send message:', error);
        socket.emit('error_message', { message: 'Failed to send message' });
      }
    });
  });

  return io;
};

export default setupSocket;
