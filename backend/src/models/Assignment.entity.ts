import { Entity, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Class } from './Class.entity';
import { BaseEntity } from './BaseEntity.entity';
import { Submission } from './Submission.entity';

@Entity()
export class Assignment extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => Class, classEntity => classEntity.assignments, { onDelete: 'CASCADE' })
  class: Class;

  @OneToMany(() => Submission, submission => submission.assignment)
  submissions: Submission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
