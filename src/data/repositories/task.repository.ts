import { getRepository } from 'typeorm';
import { Task, User } from 'data/models';
import { NotFound } from 'server/utils/errors';

export default class TaskRepository {
  static async create(createBody: {
    title: string;
    status: string;
    creator: User;
    description?: string;
    createdDate?: Date;
    dueDate?: Date;
  }) {
    const taskRepository = getRepository(Task);
    const createdTask: Task = taskRepository.create(createBody);
    return taskRepository.save(createdTask);
  }

  static get(id: string) {
    const taskRepository = getRepository(Task);
    return taskRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
  }

  static getAll(filters: any) {
    const taskRepository = getRepository(Task);
    return taskRepository.find({
      where: filters,
      relations: ['creator'],
    });
  }

  static getAllByPks(pks: number[]) {
    const taskRepository = getRepository(Task);
    return taskRepository.findByIds(pks);
  }

  static async update(updateBody: {
    id: string;
    title: string;
    status: string;
    creator: User;
    description: string;
    createdDate: Date;
    dueDate: Date;
  }) {
    return this.partialUpdate(updateBody);
  }

  static async partialUpdate(updateBody: {
    id: string;
    title?: string;
    status?: string;
    creator?: User;
    description?: string;
    createdDate?: Date;
    dueDate?: Date;
  }) {
    const taskRepository = getRepository(Task);
    const foundTask: Task = await taskRepository.findOne(updateBody.id);

    if (!foundTask) throw new NotFound(`Task with primary key ${updateBody.id} not found`);
    if (updateBody.title !== undefined) foundTask.title = updateBody.title;
    if (updateBody.description !== undefined) foundTask.description = updateBody.description;
    if (updateBody.createdDate !== undefined) foundTask.createdDate = updateBody.createdDate;
    if (updateBody.status !== undefined) foundTask.status = updateBody.status;
    if (updateBody.dueDate !== undefined) foundTask.dueDate = updateBody.dueDate;
    if (updateBody.creator !== undefined) foundTask.creator = updateBody.creator;
    await taskRepository.save(foundTask);
    return foundTask;
  }

  static async destroy(id: string) {
    const taskRepository = getRepository(Task);
    const foundTask = await taskRepository.findOne(id);

    if (!foundTask) throw new NotFound(`Task with primary key ${id} not found`);

    await taskRepository.delete(id);
    return foundTask;
  }
}
