import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity.entity';
import { ChatMessage } from './ChatMessage.entity';
import { User } from './User.entity';

@Entity()
export class Chat extends BaseEntity {
  @ManyToOne(() => User)
  userA: User;

  @ManyToOne(() => User)
  userB: User;

  @OneToMany(() => ChatMessage, message => message.chat)
  messages: ChatMessage[];

  @OneToOne(() => ChatMessage, { nullable: true })
  @JoinColumn()
  lastMessage: ChatMessage;
}
