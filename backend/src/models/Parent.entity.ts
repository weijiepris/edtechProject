import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Student } from './Student.entity';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.parent)
  @JoinColumn()
  user: User;

  // One parent can have multiple students
  @OneToMany(() => Student, student => student.parentId)
  children: Student[];
}
