import { Request, Response, NextFunction } from 'express';
import { CREATED } from 'http-status';
import { User } from 'data/models';
import { TaskService, UserService } from 'server/services';
import { NotFound } from 'server/utils/errors';

export default class TaskController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const { id } = req.params;
    const { title, status, creator, description, createdDate, dueDate } = req.body;

    let dbCreator: User;
    if (creator !== null && typeof creator !== 'undefined') {
      dbCreator = await UserService.get(creator);
      if (!dbCreator) {
        throw new NotFound(`User ${creator} not found`);
      }
    }
    if (id !== undefined) {
      return serviceAction({
        id,
        title,
        status,
        creator: dbCreator,
        description,
        createdDate,
        dueDate,
      });
    }
    return serviceAction({
      title,
      status,
      creator: dbCreator,
      description,
      createdDate,
      dueDate,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newTask = await TaskController.runServiceAction(req, TaskService.create);
      res.locals.status = CREATED;
      res.locals.data = newTask;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const taskObject = await TaskService.get(id);
      if (!taskObject) {
        throw new NotFound(`Task with primary key ${id} not found`);
      }

      res.locals.data = taskObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { ...req.query };
      const allTasks = await TaskService.getAll(filters);
      res.locals.data = allTasks;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedTask = await TaskController.runServiceAction(req, TaskService.update);
      res.locals.data = updatedTask;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedTask = await TaskController.runServiceAction(req, TaskService.partialUpdate);
      res.locals.data = updatedTask;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const taskDelete = await TaskService.destroy(id);
      res.locals.data = taskDelete;

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
