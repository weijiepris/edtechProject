import { Entity, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Class } from './Class.entity';
import { BaseEntity } from './BaseEntity.entity';
import { Submission } from './Submission.entity';
import { AssignmentStatus } from '../utils/constants';

@Entity()
export class Assignment extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @ManyToOne(() => Class, classEntity => classEntity.assignments, { onDelete: 'CASCADE' })
  class: Class;

  @OneToMany(() => Submission, submission => submission.assignment)
  submissions: Submission[];
}
