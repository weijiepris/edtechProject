import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Submission } from './Submission.entity';
import { BaseEntity } from './BaseEntity.entity';
import { Teacher } from './Teacher.entity';

@Entity()
export class Feedback extends BaseEntity {
  @Column('text')
  comment: string;

  @Column({ type: 'int', nullable: true })
  grade?: number;

  @ManyToOne(() => Teacher, teacher => teacher.feedbacks, {
    onDelete: 'SET NULL',
    nullable: true
  })
  teacher: Teacher;

  @OneToOne(() => Submission, submission => submission.feedback, {
    onDelete: 'CASCADE',
    nullable: false
  })
  submission: Submission;
}
