import { UserRepository } from 'data/repositories';

export default class UserService {
  static create(createBody: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    return UserRepository.create(createBody);
  }

  static get(id: string) {
    return UserRepository.get(id);
  }

  static getAll(args: any) {
    return UserRepository.getAll(args);
  }

  static getAllByPks(pks: number[]) {
    return UserRepository.getAllByPks(pks);
  }

  static update(updateBody: {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return UserRepository.update(updateBody);
  }

  static partialUpdate(updateBody: {
    id: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }) {
    return UserRepository.partialUpdate(updateBody);
  }

  static destroy(id: string) {
    return UserRepository.destroy(id);
  }
}
