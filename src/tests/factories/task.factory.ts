import { date, random } from 'faker';
import { getRepository } from 'typeorm';
import { Task, User } from 'data/models';
import { dateToUTC, getRandomValueFromArray } from 'server/utils/functions';
import { taskStatusChoices } from '../../server/utils/constants/fieldChoices';
import { buildUser, createUser } from './user.factory';

interface TaskRelations {
  creator?: User;
}

async function buildTask(task: TaskRelations): Promise<Task> {
  const resTask = new Task();

  resTask.title = random.word().slice(0, 50);
  resTask.description = random.word().slice(0, 512);
  resTask.createdDate = new Date(dateToUTC(date.past()).format('YYYY-MM-DDTHH:mm:ss[.000Z]'));
  resTask.status = getRandomValueFromArray(taskStatusChoices);
  resTask.dueDate = new Date(dateToUTC(date.past()).format('YYYY-MM-DD'));

  resTask.creator = task.creator;

  if (task.creator === null || typeof task.creator === 'undefined') {
    const fakeCreator = await buildUser({});
    const createdFakeCreator = await createUser(fakeCreator);
    resTask.creator = createdFakeCreator;
  }

  return Promise.resolve(resTask);
}

async function createTask(fakeTask: Task): Promise<Task> {
  const repository = getRepository(Task);
  const task = repository.create(fakeTask);
  await repository.save(task);

  return task;
}

export { buildTask, createTask };
