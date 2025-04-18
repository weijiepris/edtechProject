import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { User } from './User.entity';
import { Parent } from './Parent.entity';
import { BaseEntity } from './BaseEntity.entity';
import { StudentClass } from './StudentClass.entity';
import { Submission } from './Submission.entity';

@Entity()
export class Student extends BaseEntity {
  @OneToOne(() => User, user => user.student)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  grade?: string;

  @Column({ nullable: true })
  school?: string;

  @ManyToOne(() => Parent, parent => parent.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent?: Parent;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Student, student => student.friends)
  @JoinTable({
    name: 'student_friends',
    joinColumn: {
      name: 'studentId',
      referencedColumnName: 'uuid'
    },
    inverseJoinColumn: {
      name: 'friendId',
      referencedColumnName: 'uuid'
    }
  })
  friends: Student[];

  @OneToMany(() => StudentClass, studentClass => studentClass.student)
  studentClasses: StudentClass[];

  @OneToMany(() => Submission, submission => submission.student)
  submissions: Submission[];
}
