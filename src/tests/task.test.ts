import { getRepository } from 'typeorm';
import request from 'supertest';
import { Task, User } from 'data/models';
import { app } from 'server/app';
import { buildTask, buildUser, createTask, createUser } from './factories';
import { Database, setUpRoutesAndMiddlewares } from './utils';

const ENDPOINT = '/task';

describe('Task tests', () => {
  beforeAll(async () => {
    await Database.startDatabase();
    setUpRoutesAndMiddlewares();
  });

  afterAll(async () => {
    Database.dropDatabase();
  });

  beforeEach(async () => {
    await Database.connection.synchronize(true);
  });

  test('/POST - Response with a new created task', async () => {
    const taskRepository = getRepository(Task);
    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const fakeTask = await buildTask({ creator: relFakeCreator });

    const taskBody = {
      ...fakeTask,
      creator: relFakeCreator.id,
    };

    const response = await request(app).post(ENDPOINT).send(taskBody);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTask = response.body.data;

    const task = await taskRepository.findOne(responseTask.id, {
      relations: ['creator'],
    });

    expect(task.title).toBe(fakeTask.title);
    expect(task.description).toBe(fakeTask.description);
    expect(new Date(task.createdDate)).toStrictEqual(fakeTask.createdDate);
    expect(task.status).toBe(fakeTask.status);
    expect(new Date(task.dueDate)).toStrictEqual(fakeTask.dueDate);

    expect(task.creator.id).toBe(fakeTask.creator.id);
  });

  test('/POST - creator does not exist, task cant be created', async () => {
    const userRepository = getRepository(User);

    const fakeTask = await buildTask({});
    const fakeTaskBody = {
      ...fakeTask,
      creator: fakeTask.creator.id,
    };

    await userRepository.delete(fakeTask.creator.id);

    const response = await request(app).post(ENDPOINT).send(fakeTaskBody);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a task', async () => {
    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const task = await buildTask({
      creator: relFakeCreator,
    });
    const fakeTask = await createTask(task);

    const response = await request(app).get(`${ENDPOINT}/${fakeTask.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeTask.id);
    expect(data.title).toBe(fakeTask.title);
    expect(data.description).toBe(fakeTask.description);
    expect(new Date(data.createdDate)).toStrictEqual(fakeTask.createdDate);
    expect(data.status).toBe(fakeTask.status);
    expect(data.dueDate).toBe(fakeTask.dueDate);

    expect(data.creator.id).toBe(fakeTask.creator.id);
  });

  test('/GET - Response with a task not found', async () => {
    const taskRepository = getRepository(Task);
    const task = await buildTask({});
    const fakeTask = await createTask(task);
    const { id } = fakeTask;
    await taskRepository.delete(fakeTask.id);

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;

    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of tasks', async () => {
    const taskRepository = getRepository(Task);
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allTasks = await taskRepository.find();
    expect(data.length).toBe(allTasks.length);
  });

  test('/PUT - Response with an updated task', async () => {
    const taskRepository = getRepository(Task);
    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const task = await buildTask({ creator: relFakeCreator });
    const fakeTask = await createTask(task);

    const anotherCreator = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreator);

    const anotherFakeTask = await buildTask({ creator: anotherrelFakeCreator });

    const { id } = fakeTask;

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: anotherFakeTask.title,
      description: anotherFakeTask.description,
      createdDate: anotherFakeTask.createdDate,
      status: anotherFakeTask.status,
      dueDate: anotherFakeTask.dueDate,
      creator: anotherFakeTask.creator.id,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeTask.title);
    expect(data.description).toBe(anotherFakeTask.description);
    expect(new Date(data.createdDate)).toStrictEqual(anotherFakeTask.createdDate);
    expect(data.status).toBe(anotherFakeTask.status);
    expect(new Date(data.dueDate)).toStrictEqual(anotherFakeTask.dueDate);
    expect(data.creator.id).toBe(anotherFakeTask.creator.id);

    const updatedTask = await taskRepository.findOne(id, { relations: ['creator'] });

    expect(updatedTask.title).toBe(anotherFakeTask.title);
    expect(updatedTask.description).toBe(anotherFakeTask.description);
    expect(new Date(updatedTask.createdDate)).toStrictEqual(anotherFakeTask.createdDate);
    expect(updatedTask.status).toBe(anotherFakeTask.status);
    expect(new Date(updatedTask.dueDate)).toStrictEqual(anotherFakeTask.dueDate);

    expect(updatedTask.creator.id).toBe(anotherFakeTask.creator.id);
  });

  test('/PUT - creator does not exists, task cant be updated', async () => {
    const userRepository = getRepository(User);
    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const task = await buildTask({ creator: relFakeCreator });
    const fakeTask = await createTask(task);

    const anotherCreator = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreator);

    task.creator = anotherrelFakeCreator;

    await userRepository.delete(anotherrelFakeCreator.id);

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: task.title,
      description: task.description,
      createdDate: task.createdDate,
      status: task.status,
      dueDate: task.dueDate,
      creator: task.creator.id,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Task does not exists, task cant be updated', async () => {
    const taskRepository = getRepository(Task);
    const task = await buildTask({});
    const fakeTask = await createTask(task);
    const { id } = fakeTask;
    await taskRepository.delete(id);

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      title: task.title,
      description: task.description,
      createdDate: task.createdDate,
      status: task.status,
      dueDate: task.dueDate,
      creator: task.creator.id,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated task (no updates)', async () => {
    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const task = await buildTask({ creator: relFakeCreator });
    const fakeTask = await createTask(task);

    const response = await request(app).patch(`${ENDPOINT}/${fakeTask.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated task', async () => {
    const taskRepository = getRepository(Task);
    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const task = await buildTask({ creator: relFakeCreator });
    const fakeTask = await createTask(task);
    const { id } = fakeTask;

    const anotherCreator = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreator);

    const anotherFakeTask = await buildTask({ creator: anotherrelFakeCreator });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({ title: anotherFakeTask.title });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeTask.title);

    const updatedTask = await taskRepository.findOne(id);

    expect(updatedTask.title).toBe(anotherFakeTask.title);
  });

  test('/PATCH - creator does not exists, task cant be updated', async () => {
    const userRepository = getRepository(User);
    const task = await buildTask({});
    const fakeTask = await createTask(task);

    const relCreator = await buildUser({});
    const relFakeCreator = await createUser(relCreator);

    const relFakeCreatorId = relFakeCreator.id;
    await userRepository.delete(relFakeCreator.id);

    const response = await request(app).patch(`${ENDPOINT}/${fakeTask.id}`).send({
      creator: relFakeCreatorId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Task does not exists, task cant be updated', async () => {
    const taskRepository = getRepository(Task);
    const task = await buildTask({});
    const fakeTask = await createTask(task);
    const { id } = fakeTask;
    const { title } = fakeTask;
    await taskRepository.delete(id);

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ title });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted task', async () => {
    const taskRepository = getRepository(Task);
    const task = await buildTask({});
    const fakeTask = await createTask(task);

    const response = await request(app).delete(`${ENDPOINT}/${fakeTask.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeTask.id);

    const deletedTask = await taskRepository.findOne(fakeTask.id);
    expect(deletedTask).toBe(undefined);
  });

  test('/DELETE - Task does not exists, task cant be deleted', async () => {
    const taskRepository = getRepository(Task);
    const task = await buildTask({});
    const fakeTask = await createTask(task);
    const { id } = fakeTask;
    await taskRepository.delete(id);

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
