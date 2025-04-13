import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity.entity';
import { User } from './User.entity';
import { Chat } from './Chat.entity';

@Entity()
export class ChatMessage extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => Chat, chat => chat.messages, { nullable: false })
  chat: Chat;

  @ManyToOne(() => User)
  sender: User;

  @Column()
  receiverId: string; // assuming a 1-1 chat for now
}
