import { Entity, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Assignment } from './Assignment.entity';
import { Student } from './Student.entity';
import { BaseEntity } from './BaseEntity.entity';
import { Feedback } from './Feedback.entity';

@Entity()
export class Submission extends BaseEntity {
  @Column('text')
  content: string;

  @Column({ nullable: true })
  grade?: number;

  @ManyToOne(() => Assignment, assignment => assignment.submissions, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => Student, student => student.submissions, { onDelete: 'CASCADE' })
  student: Student;

  @OneToOne(() => Feedback, feedback => feedback.submission, { cascade: true })
  feedback?: Feedback;

  @CreateDateColumn()
  submittedAt: Date;
}
