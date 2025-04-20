// controllers/chatController.ts
import { Request, Response } from 'express';
import { Chat } from '../../models/Chat.entity';

export const getChatPartners = async (req: Request, res: Response) => {
  const userId = req.user?.uuid;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const chats = await Chat.find({
      where: [{ userA: { uuid: userId } }, { userB: { uuid: userId } }],
      relations: {
        userA: true,
        userB: true,
        lastMessage: true
      }
    });

    const chatPartners = chats.map(chat => {
      const isUserA = chat.userA.uuid === userId;
      const partner = isUserA ? chat.userB : chat.userA;

      return {
        chatId: chat.uuid,
        partner: {
          uuid: partner.uuid,
          firstName: partner.firstName,
          lastName: partner.lastName,
          email: partner.email
        },
        lastMessage: chat.lastMessage
          ? {
              content: chat.lastMessage.content,
              createdAt: chat.lastMessage.createdAt
            }
          : null
      };
    });

    res.status(200).json(chatPartners);
    return;
  } catch (err) {
    console.error('Failed to fetch chat partners:', err);
    res.status(500).json({ message: 'Failed to fetch chat partners' });
    return;
  }
};
