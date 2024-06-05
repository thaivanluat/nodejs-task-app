import AdminBro from 'admin-bro';
import { User, Task } from 'data/models';
import { taskStatusChoices } from '../utils/constants/fieldChoices';

const initializeAdminBroRoutes = () =>
  new AdminBro({
    rootPath: '/admin',
    resources: [
      {
        resource: User,
        options: {
          parent: {
            name: 'Database',
            icon: 'Api',
          },
          listProperties: ['id', 'username', 'firstName', 'lastName', 'password'],
        },
      },
      {
        resource: Task,
        options: {
          parent: {
            name: 'Database',
            icon: 'Api',
          },
          listProperties: ['id', 'title', 'description', 'createdDate', 'status', 'dueDate'],
          properties: {
            status: {
              availableValues: taskStatusChoices.map((status) => ({
                value: status,
                label: status.toUpperCase(),
              })),
            },
          },
        },
      },
    ],
    branding: {
      companyName: 'Database dashboard',
      softwareBrothers: false,
      logo: false
    },
  });

export default initializeAdminBroRoutes;
