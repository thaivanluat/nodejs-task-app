import { User } from 'data/models';
import { TaskRepository } from 'data/repositories';

export default class TaskService {
  static create(createBody: {
    title: string;
    status: string;
    creator: User;
    description?: string;
    createdDate?: Date;
    dueDate?: Date;
  }) {
    return TaskRepository.create(createBody);
  }

  static get(id: string) {
    return TaskRepository.get(id);
  }

  static getAll(args: any) {
    return TaskRepository.getAll(args);
  }

  static getAllByPks(pks: number[]) {
    return TaskRepository.getAllByPks(pks);
  }

  static update(updateBody: {
    id: string;
    title: string;
    status: string;
    creator: User;
    description: string;
    createdDate: Date;
    dueDate: Date;
  }) {
    return TaskRepository.update(updateBody);
  }

  static partialUpdate(updateBody: {
    id: string;
    title?: string;
    status?: string;
    creator?: User;
    description?: string;
    createdDate?: Date;
    dueDate?: Date;
  }) {
    return TaskRepository.partialUpdate(updateBody);
  }

  static destroy(id: string) {
    return TaskRepository.destroy(id);
  }
}
