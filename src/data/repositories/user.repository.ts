import { getRepository } from 'typeorm';
import { User } from 'data/models';
import { NotFound } from 'server/utils/errors';

export default class UserRepository {
  static async create(createBody: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const userRepository = getRepository(User);
    const createdUser: User = userRepository.create(createBody);
    return userRepository.save(createdUser);
  }

  static get(id: string) {
    const userRepository = getRepository(User);
    return userRepository.findOne({
      where: { id },
      relations: ['createdTasks'],
    });
  }

  static getAll(filters: any) {
    const userRepository = getRepository(User);
    return userRepository.find({
      where: filters,
      relations: ['createdTasks'],
    });
  }

  static getAllByPks(pks: number[]) {
    const userRepository = getRepository(User);
    return userRepository.findByIds(pks);
  }

  static async update(updateBody: {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.partialUpdate(updateBody);
  }

  static async partialUpdate(updateBody: {
    id: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }) {
    const userRepository = getRepository(User);
    const foundUser: User = await userRepository.findOne(updateBody.id);

    if (!foundUser) throw new NotFound(`User with primary key ${updateBody.id} not found`);
    if (updateBody.username !== undefined) foundUser.username = updateBody.username;
    if (updateBody.firstName !== undefined) foundUser.firstName = updateBody.firstName;
    if (updateBody.lastName !== undefined) foundUser.lastName = updateBody.lastName;
    if (updateBody.password !== undefined) foundUser.password = updateBody.password;
    await userRepository.save(foundUser);
    return foundUser;
  }

  static async destroy(id: string) {
    const userRepository = getRepository(User);
    const foundUser = await userRepository.findOne(id);

    if (!foundUser) throw new NotFound(`User with primary key ${id} not found`);

    await userRepository.delete(id);
    return foundUser;
  }
}
