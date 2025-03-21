import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';
import { Student } from './Student.entity';
import { Class } from './Class.entity';

@Entity()
export class StudentClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, student => student.studentClasses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Class, classEntity => classEntity.studentClasses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @CreateDateColumn()
  enrolledAt: Date;
}
