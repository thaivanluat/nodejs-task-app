import { random } from 'faker';
import { getRepository } from 'typeorm';
import { User } from 'data/models';

interface UserRelations {}

async function buildUser(user: UserRelations): Promise<User> {
  const resUser = new User();

  resUser.username = random.word().slice(0, 80);
  resUser.firstName = random.word().slice(0, 50);
  resUser.lastName = random.word().slice(0, 50);
  resUser.password = random.word().slice(0, 255);

  return Promise.resolve(resUser);
}

async function createUser(fakeUser: User): Promise<User> {
  const repository = getRepository(User);
  const user = repository.create(fakeUser);
  await repository.save(user);

  return user;
}

export { buildUser, createUser };
