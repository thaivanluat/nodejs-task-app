/* eslint import/no-cycle: "off" */
import { IsDate, IsIn, Length } from 'class-validator';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { taskStatusChoices } from '../../server/utils/constants/fieldChoices';
import User from './user.model';

@Entity()
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Length(0, 50)
  @Column()
  title: string;

  @Length(0, 512)
  @Column({ nullable: true, default: null })
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @IsIn(taskStatusChoices)
  @Column()
  status: string;

  @IsDate()
  @Column({ nullable: true, default: null, type: 'date' })
  dueDate: Date;

  @ManyToOne(() => User, (user: User) => user.createdTasks, { onDelete: 'CASCADE' })
  creator: User;

  @RelationId((task: Task) => task.creator)
  creatorId: string;
}
