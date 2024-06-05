### Run the app in terminal

Install packages and start the application server.

```
$ npm install
$ npm start
```



5. Build the application

```

$ npm build

```

6. Generate and apply migrations

```

$ npm typeorm migration:generate --config .dev.env -n database-migrations
$ npm build
$ npm typeorm migration:run --config .dev.env

```


### Run the app inside a Docker container

Build the docker container and get it up and running.

```

$ docker-compose build
$ docker-compose up

```

### Run migrations inside a Docker container

With docker-compose running, in another terminal:

```

$ docker exec -it docker_name /bin/sh
$ npm run typeorm migration:generate -- -n migration_name --config .prod.env
$ npm run build
$ npm run typeorm migration:run -- --config .prod.env

```

### Make API calls against the server

1. Go to [http://localhost:8000/swagger](http://localhost:8000/swagger) to see Swagger documentation for API endpoints.
2. Run the APIs by clicking the "Try it now" button on the Swagger page.

### Run admin bro dashboard

Go to [http://localhost:8000/admin](http://localhost:8000/admin)

### Run tests and check code coverage

```

$ npm test
$ npm coverage

```

### Lint your code

```

$ npm lint
$ npm format

```
