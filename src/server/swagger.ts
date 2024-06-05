const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/user/': {
      get: {
        summary: 'Lists all the users',
        tags: ['user'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      post: {
        summary: 'Creates a user',
        tags: ['user'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new user',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        },
      },
    },
    '/user/{id}': {
      get: {
        summary: 'Gets a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a user with primary key',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a user',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      patch: {
        tags: ['user'],
        summary: 'patch a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user and its partially overwritten values',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },

    '/task/': {
      get: {
        summary: 'Lists all the tasks',
        tags: ['task'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      post: {
        summary: 'Creates a task',
        tags: ['task'],
        parameters: [
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new task',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        },
      },
    },
    '/task/{id}': {
      get: {
        summary: 'Gets a task by its primary key',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a task with primary key',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a task by its primary key',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a task',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Task',
            },
          },
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a task',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      patch: {
        tags: ['task'],
        summary: 'patch a task',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
          {
            name: 'task',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a task and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ['username', 'password'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 80,
        },
        firstName: {
          type: 'string',
          maxLength: 50,
        },
        lastName: {
          type: 'string',
          maxLength: 50,
        },
        password: {
          type: 'string',
          maxLength: 255,
        },
        createdTasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    Task: {
      required: ['title', 'status', 'creator'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          maxLength: 50,
        },
        description: {
          type: 'string',
          maxLength: 512,
        },
        createdDate: {
          type: 'string',
          format: 'date-time',
        },
        status: {
          type: 'string',
          enum: ['To do', 'In Progress', 'Done'],
        },
        dueDate: {
          type: 'string',
          format: 'date',
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateUser: {
      required: ['username', 'password'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 80,
        },
        firstName: {
          type: 'string',
          maxLength: 50,
        },
        lastName: {
          type: 'string',
          maxLength: 50,
        },
        password: {
          type: 'string',
          maxLength: 255,
        },
      },
    },

    CreateUpdateTask: {
      required: ['title', 'status', 'creator'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          maxLength: 50,
        },
        description: {
          type: 'string',
          maxLength: 512,
        },
        createdDate: {
          type: 'string',
          format: 'date-time',
        },
        status: {
          type: 'string',
          enum: ['To do', 'In Progress', 'Done'],
        },
        dueDate: {
          type: 'string',
          format: 'date',
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },
  },
};

export default swaggerDocument;
