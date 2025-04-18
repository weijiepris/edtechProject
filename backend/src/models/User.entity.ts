import { Entity, Column, OneToOne, JoinColumn, Check } from 'typeorm';
import { UserRoles } from '../utils/constants';
import { Teacher } from './Teacher.entity';
import { Student } from './Student.entity';
import { Parent } from './Parent.entity';
import { BaseEntity } from './BaseEntity.entity';

@Entity()
@Check(`"email" ~* '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'`)
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Do not retrieve password by default
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER
  })
  role: UserRoles;

  @OneToOne(() => Teacher, teacher => teacher.user, { nullable: true })
  @JoinColumn()
  teacher?: Teacher;

  @OneToOne(() => Student, student => student.user, { nullable: true })
  @JoinColumn()
  student?: Student;

  @OneToOne(() => Parent, parent => parent.user, { nullable: true })
  @JoinColumn()
  parent?: Parent;
}
