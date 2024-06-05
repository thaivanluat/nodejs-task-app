import { Joi } from 'express-validation';
import { taskStatusChoices } from 'server/utils/constants/fieldChoices';

const taskValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.string().uuid({ version: ['uuidv4'] }),
      title: Joi.string().max(50),
      description: Joi.string().max(512),
      createdDate: Joi.date(),
      status: Joi.string().valid(...taskStatusChoices),
      dueDate: Joi.date(),
    }),
  },
  create: {
    body: Joi.object({
      creator: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      title: Joi.string().max(50).required(),
      description: Joi.string().max(512),
      createdDate: Joi.date(),
      status: Joi.string()
        .valid(...taskStatusChoices)
        .required(),
      dueDate: Joi.date(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      title: Joi.string().max(50).required(),
      description: Joi.string().max(512).required(),
      createdDate: Joi.date().required(),
      status: Joi.string()
        .valid(...taskStatusChoices)
        .required(),
      dueDate: Joi.date().required(),
      creator: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      title: Joi.string().max(50),
      description: Joi.string().max(512),
      createdDate: Joi.date(),
      status: Joi.string().valid(...taskStatusChoices),
      dueDate: Joi.date(),
      creator: Joi.string().uuid({ version: ['uuidv4'] }),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
  },
};

export default taskValidation;
