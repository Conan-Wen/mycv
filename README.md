## Description

Nest tutorial project.

### Point

-   TypeORM DataSources
-   JWT Authentication

## Node Version

## Installation

```bash
$ npm install
```

## Running the app

### Database

###

Setting environment variables in `.env` file based on `.env.template`.

Don't forget the environment variables in `./database/maria-database/.env` file.


### Database

Start up database with docker-compose in `./database` directory.

```bash
$ docker-compose up -d
````

### Migrations

```bash
$ npm run typeorm:dev migration:run -- -d ./src/data-sources/mariadbDataSource.ts
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support
