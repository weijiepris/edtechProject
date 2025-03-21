import { Entity, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Submission } from './Submission.entity';
import { BaseEntity } from './BaseEntity.entity';

@Entity()
export class Feedback extends BaseEntity {
  @Column('text')
  content: string;

  @Column({ nullable: true })
  rating?: number;

  @OneToOne(() => Submission, submission => submission.feedback, { onDelete: 'CASCADE' })
  @JoinColumn()
  submission: Submission;

  @CreateDateColumn()
  createdAt: Date;
}
