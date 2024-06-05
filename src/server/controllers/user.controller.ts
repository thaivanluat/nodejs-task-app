import { Request, Response, NextFunction } from 'express';
import { CREATED } from 'http-status';
import { UserService } from 'server/services';
import { NotFound } from 'server/utils/errors';

export default class UserController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const { id } = req.params;
    const { username, password, firstName, lastName } = req.body;
    if (id !== undefined) {
      return serviceAction({
        id,
        username,
        password,
        firstName,
        lastName,
      });
    }
    return serviceAction({
      username,
      password,
      firstName,
      lastName,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await UserController.runServiceAction(req, UserService.create);
      res.locals.status = CREATED;
      res.locals.data = newUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userObject = await UserService.get(id);
      if (!userObject) {
        throw new NotFound(`User with primary key ${id} not found`);
      }

      res.locals.data = userObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { ...req.query };
      const allUsers = await UserService.getAll(filters);
      res.locals.data = allUsers;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await UserController.runServiceAction(req, UserService.update);
      res.locals.data = updatedUser;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await UserController.runServiceAction(req, UserService.partialUpdate);
      res.locals.data = updatedUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userDelete = await UserService.destroy(id);
      res.locals.data = userDelete;

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
