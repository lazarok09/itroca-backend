# iTroca backend

## Tecnologies

## Swagger API

[Access the API docs here](http://localhost:3000/api-docs/#/)

## Running the project

### Scripts

Install the projects dependecies

```bash
    yarn
```

Development with hot-reload

```bash
    yarn dev
```

To start the compiler process and run the server

```bash
    yarn start
```

## Prisma docs

- How to connect a migration to database and create a model there
  https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql

## Accessing the database inside docker
```
docker exec -it docker_hash_id bash

psql -U admin -d itrocadata

itrocadata=#
```