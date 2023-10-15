# Todo List API

This is a simple todo list API.

## Made using

- Nodejs + ExpressJS
- Typescript
- Prisma
- Zod
- Swagger

## Getting started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Nodejs + NPM
- [PostgreSQL](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)
- [Redis](https://redis.io/docs/getting-started/installation/)
- Docker(optional)

### Installation

1. Clone the repository

   ```bash
       git clone https://github.com/tb0se/todo-list-api.git
   ```

2. Ensure you create a `.env` file in the root of the project directory with the following environment variables

   ```bash
       PORT=5000
       JWT_SECRET="supersecret"
       NODE_ENV='development'
   ```

3. Install the required dependencies:
   ```bash
       yarn
   ```

## Usage

### Docker

The following additional environmental variables are required:

```bash
    DATABASE_URL="postgresql://user:password@postgres:5432/tododb"
    REDIS_URL="redis://redis:6379"
```

Start the containers required with the following command:

```bash
    docker  compose up
```

### Without docker

Ensure you have installed and configured:

- PostgreSQL server
- Redis server

The following additional environmental variables are required:

```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/tododb"
    REDIS_URL="redis://localhost:6379"
```

1. Start the dev server

   ```bash
       yarn dev
   ```

Runs the app in the development mode.
Open http://localhost:5000/api-docs to view it in the browser.
