import { getRepository } from 'typeorm';
import request from 'supertest';
import { User } from 'data/models';
import { app } from 'server/app';
import { buildUser, createUser } from './factories';
import { Database, setUpRoutesAndMiddlewares } from './utils';

const ENDPOINT = '/user';

describe('User tests', () => {
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

  test('/POST - Response with a new created user', async () => {
    const userRepository = getRepository(User);

    const fakeUser = await buildUser({});

    const userBody = {
      ...fakeUser,
    };
    delete userBody.createdTasks;

    const response = await request(app).post(ENDPOINT).send(userBody);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUser = response.body.data;

    const user = await userRepository.findOne(responseUser.id, {
      relations: [],
    });

    expect(user.username).toBe(fakeUser.username);
    expect(user.firstName).toBe(fakeUser.firstName);
    expect(user.lastName).toBe(fakeUser.lastName);
    expect(user.password).toBe(fakeUser.password);
  });

  test('/GET - Response with a user', async () => {
    const user = await buildUser({});
    const fakeUser = await createUser(user);

    const response = await request(app).get(`${ENDPOINT}/${fakeUser.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeUser.id);
    expect(data.username).toBe(fakeUser.username);
    expect(data.firstName).toBe(fakeUser.firstName);
    expect(data.lastName).toBe(fakeUser.lastName);
    expect(data.password).toBe(fakeUser.password);

    expect(data.createdTasks).toEqual([]);
  });

  test('/GET - Response with a user not found', async () => {
    const userRepository = getRepository(User);
    const user = await buildUser({});
    const fakeUser = await createUser(user);
    const { id } = fakeUser;
    await userRepository.delete(fakeUser.id);

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;

    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of users', async () => {
    const userRepository = getRepository(User);
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allUsers = await userRepository.find();
    expect(data.length).toBe(allUsers.length);
  });

  test('/PUT - Response with an updated user', async () => {
    const userRepository = getRepository(User);

    const user = await buildUser({});
    const fakeUser = await createUser(user);

    const anotherFakeUser = await buildUser({});

    const { id } = fakeUser;

    const response = await request(app).put(`${ENDPOINT}/${fakeUser.id}`).send({
      username: anotherFakeUser.username,
      firstName: anotherFakeUser.firstName,
      lastName: anotherFakeUser.lastName,
      password: anotherFakeUser.password,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.username).toBe(anotherFakeUser.username);
    expect(data.firstName).toBe(anotherFakeUser.firstName);
    expect(data.lastName).toBe(anotherFakeUser.lastName);
    expect(data.password).toBe(anotherFakeUser.password);

    const updatedUser = await userRepository.findOne(id, { relations: [] });

    expect(updatedUser.username).toBe(anotherFakeUser.username);
    expect(updatedUser.firstName).toBe(anotherFakeUser.firstName);
    expect(updatedUser.lastName).toBe(anotherFakeUser.lastName);
    expect(updatedUser.password).toBe(anotherFakeUser.password);
  });

  test('/PUT - User does not exists, user cant be updated', async () => {
    const userRepository = getRepository(User);
    const user = await buildUser({});
    const fakeUser = await createUser(user);
    const { id } = fakeUser;
    await userRepository.delete(id);

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated user (no updates)', async () => {
    const user = await buildUser({});
    const fakeUser = await createUser(user);

    const response = await request(app).patch(`${ENDPOINT}/${fakeUser.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated user', async () => {
    const userRepository = getRepository(User);

    const user = await buildUser({});
    const fakeUser = await createUser(user);
    const { id } = fakeUser;

    const anotherFakeUser = await buildUser({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeUser.id}`)
      .send({ username: anotherFakeUser.username });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.username).toBe(anotherFakeUser.username);

    const updatedUser = await userRepository.findOne(id);

    expect(updatedUser.username).toBe(anotherFakeUser.username);
  });

  test('/PATCH - User does not exists, user cant be updated', async () => {
    const userRepository = getRepository(User);
    const user = await buildUser({});
    const fakeUser = await createUser(user);
    const { id } = fakeUser;
    const { username } = fakeUser;
    await userRepository.delete(id);

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ username });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted user', async () => {
    const userRepository = getRepository(User);
    const user = await buildUser({});
    const fakeUser = await createUser(user);

    const response = await request(app).delete(`${ENDPOINT}/${fakeUser.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeUser.id);

    const deletedUser = await userRepository.findOne(fakeUser.id);
    expect(deletedUser).toBe(undefined);
  });

  test('/DELETE - User does not exists, user cant be deleted', async () => {
    const userRepository = getRepository(User);
    const user = await buildUser({});
    const fakeUser = await createUser(user);
    const { id } = fakeUser;
    await userRepository.delete(id);

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
