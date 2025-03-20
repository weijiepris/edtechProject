import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { USER_ROLES, UserRole } from '../utils/constants';
import { Teacher } from './Teacher.entity';
import { Student } from './Student.entity';
import { Parent } from './Parent.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ select: false }) // do not retrieve password by default
  password: string;

  @Column({
    default: USER_ROLES.USER
  })
  role: UserRole;

  @OneToOne(() => Teacher, teacher => teacher.user)
  teacher?: Teacher;

  @OneToOne(() => Student, student => student.user)
  student?: Student;

  @OneToOne(() => Parent, parent => parent.user)
  parent?: Parent;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  role: UserRole;
}
