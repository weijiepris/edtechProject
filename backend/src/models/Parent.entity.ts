import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Student } from './Student.entity';
import { BaseEntity } from './BaseEntity.entity';

@Entity()
export class Parent extends BaseEntity {
  @OneToOne(() => User, user => user.parent)
  @JoinColumn()
  user: User;

  // One parent can have multiple students
  @OneToMany(() => Student, student => student.parent)
  children: Student[];
}
