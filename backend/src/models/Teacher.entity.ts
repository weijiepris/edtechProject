import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Class } from './Class.entity';
import { BaseEntity } from './BaseEntity.entity';

@Entity()
export class Teacher extends BaseEntity {
  @OneToOne(() => User, user => user.teacher, { nullable: true })
  @JoinColumn()
  user?: User;

  @OneToMany(() => Class, classEntity => classEntity.teacher)
  classesTaught: Class[];
}
