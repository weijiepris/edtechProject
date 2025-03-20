import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
import { Class } from './Class.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.teacher)
  @JoinColumn()
  user: User;

  @OneToMany(() => Class, classEntity => classEntity.teacher)
  classesTaught: Class[];
}
