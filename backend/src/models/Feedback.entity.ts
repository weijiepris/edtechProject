import { Entity, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Submission } from './Submission.entity';
import { BaseEntity } from './BaseEntity.entity';
import { Teacher } from './Teacher.entity';

@Entity()
export class Feedback extends BaseEntity {
  @Column('text')
  content: string;

  @Column({ nullable: true })
  rating?: number;

  @ManyToOne(() => Teacher, teacher => teacher.feedbacks, { onDelete: 'SET NULL', nullable: true })
  teacher: Teacher;

  @ManyToOne(() => Submission, submission => submission.feedbacks, { eager: true })
  submission: Submission;
}
