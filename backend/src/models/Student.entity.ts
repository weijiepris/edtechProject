import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.student)
  @JoinColumn()
  user: User;

  @Column()
  grade: string;

  @Column()
  school: string;

  @Column({ nullable: true })
  parentId?: string; // Optional reference to the parent

  @Column({ default: true })
  isActive: boolean;
}
