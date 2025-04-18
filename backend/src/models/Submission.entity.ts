import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Assignment } from './Assignment.entity';
import { Student } from './Student.entity';
import { BaseEntity } from './BaseEntity.entity';
import { Feedback } from './Feedback.entity';
import { AssignmentStatus } from '../utils/constants';

@Entity()
export class Submission extends BaseEntity {
  @Column('text')
  content: string;

  @Column({ default: '-', nullable: true })
  grade: string;

  @ManyToOne(() => Assignment, assignment => assignment.submissions, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => Student, student => student.submissions, { onDelete: 'CASCADE' })
  student: Student;

  @OneToOne(() => Feedback, feedback => feedback.submission)
  feedback: Feedback;

  @Column({
    type: 'enum',
    enum: AssignmentStatus,
    default: AssignmentStatus.ACTIVE
  })
  status: AssignmentStatus;

  @CreateDateColumn()
  submittedAt: Date;
}
