import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity.entity';
import { StudentClass } from './StudentClass.entity';
import { Assignment } from './Assignment.entity';

@Entity()
export class Class extends BaseEntity {
  @Column()
  name: string;

  @Column()
  teacher: string;

  @OneToMany(() => StudentClass, studentClass => studentClass.class)
  studentClasses: StudentClass[];

  @OneToMany(() => Assignment, assignment => assignment.class)
  assignments: Assignment[];
}
