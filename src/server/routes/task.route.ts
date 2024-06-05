import { Router } from 'express';
import { validate } from 'express-validation';
import { TaskController } from 'server/controllers';
import { taskValidation, options } from 'server/validations';

const taskRouter = Router();

taskRouter.get('/', validate(taskValidation.getAll, options), TaskController.getAll);

taskRouter.get('/:id', TaskController.get);

taskRouter.post('/', validate(taskValidation.create, options), TaskController.create);

taskRouter.put('/:id', validate(taskValidation.update, options), TaskController.update);

taskRouter.patch(
  '/:id',
  validate(taskValidation.partialUpdate, options),
  TaskController.partialUpdate,
);

taskRouter.delete('/:id', validate(taskValidation.destroy, options), TaskController.destroy);

export default taskRouter;
