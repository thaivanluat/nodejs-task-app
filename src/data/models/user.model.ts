/* eslint import/no-cycle: "off" */
import { Length } from 'class-validator';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Task from './task.model';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Length(0, 80)
  @Column()
  username: string;

  @Length(0, 50)
  @Column({ nullable: true, default: null })
  firstName: string;

  @Length(0, 50)
  @Column({ nullable: true, default: null })
  lastName: string;

  @Length(0, 255)
  @Column()
  password: string;

  @OneToMany(() => Task, (task: Task) => task.creator)
  createdTasks: Task[];
}
