import { Connection, createConnection } from 'typeorm';
import { User, Task } from 'data/models';
import { setUpAPIRoutes, setUpMiddlewares } from 'server/app';

class Database {
  public static connection: Connection;

  static async startDatabase() {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User, Task],
      logging: false,
      synchronize: true,
    })
      .then((_con) => {
        Database.connection = _con;
      })
      .catch(console.error);
  }

  static dropDatabase(): void {
    Database.connection.dropDatabase();
  }
}

function setUpRoutesAndMiddlewares() {
  setUpAPIRoutes();
  setUpMiddlewares();
}

export { Database, setUpRoutesAndMiddlewares };
