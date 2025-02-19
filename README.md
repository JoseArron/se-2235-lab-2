## SE 2144 FINAL PROJECT

## Table of Contents

- [Installation](#installation)
- [Setup Prettier](#setup-prettier-for-code-formatting)
- [Setup local Postgres database](#set-up-local-postgres-database)
- [How to run the app](#how-to-run-the-app)
- [Running Storybook](#running-storybook)
- [Updating table schemas](#updating-table-schemas)
- [Linting](#linting)
- [Testing](#testing)

## Resources

- [dbmate Docs](https://github.com/amacneil/dbmate?tab=readme-ov-file#migration-files)

## Installation

To get started, follow the steps below:

### Clone the repository

```bash
git clone https://github.com/JoseArron/se-2235-lab-2
```

### Navigate to the project directory:

```bash
cd se-2235-lab-2
```

### Install all dependencies

In the **root** folder, run

```bash
npm run install-all
```

## Setup Prettier for code formatting

1. Install [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for vscode
2. Go to `File > Preferences > Settings`
3. Search for `Format` in the search bar
4. Select Prettier in the `Default Formatter` dropdown
5. Enable `Format on Save`

## Set up local Postgres database

### Add database connection link

Add a `.env` file in the **backend folder** with the following format without the square brackets:

```js
DATABASE_URL =
  "postgres://postgres:[YOUR_POSTGRES_PASSWORD]@localhost:5432/notetube_dev?sslmode=disable";
```

### Using dbmate

In the **root** folder, run

```bash
npm run migrate-up
```

### Using pgAdmin

1. Open pgAdmin
2. Make a new database named `notetube_dev`
3. Open the **query tool** in the notetube_dev database
4. Paste and execute `backend/database.sql` contents except the `CREATE DATABASE` query

### Using terminal

1. Open terminal
2. Access your postgres db

```bash
psql -U postgres
```

if you encounter this error: `psql: command not found`,
follow this [tutorial](https://www.commandprompt.com/education/how-to-set-windows-path-for-postgres-tools/)

3. Input your password

```
Password for user postgres:
```

4. Paste and run `backend/database.sql` contents into prompt

## How to run the app

In the **root** folder

> ```bash
> npm run app
> ```
>
> to run `frontend` only
>
> ```bash
> npm run frontend
> ```
>
> to run `backend` only
>
> ```bash
> npm run backend
> ```

In `frontend` & `backend` folders

> to run `frontend` only
>
> ```bash
> cd frontend
> npm run dev
> ```
>
> to run `backend` only
>
> ```bash
> cd backend
> npm run dev
> ```

## Running Storybook

Navigate to the `frontend` directory:

```bash
cd frontend
```

Run storybook

```bash
npm run storybook
```

## Updating table schemas

### Adding a table schema

1. Navigate to the `backend` folder

```bash
cd backend
```

2. Generate a new migration file

```bash
npx dbmate new [table_name]
```

3. In `db/migrations`, open your new migration file then modify it with this format:

> dbmate generates migration files in this format -> `YYYYMMDDXXXX_name.sql`

```js
// -- migrate:up
// Write your SQL query to create the new table here. For example:
CREATE TABLE [table_name] (
    id SERIAL PRIMARY KEY,
    column1 VARCHAR(255) NOT NULL,
    column2 INT NOT NULL,
    ...
);

// -- migrate:down
// Write your SQL query to drop the table here. For example:
DROP TABLE IF EXISTS [table_name];
```

4. Migrate the table schema to your local database

```bash
npx dbmate up
```

### Updating a table schema

1. Apply and save your changes to any of the migration files under `db/migrations` using your IDE

2. Navigate to the `backend` folder

```bash
cd backend
```

3. Roll back the latest migration to its initial state

> If you want to rollback older migrations, you will need to run `npx dbmate down` n times depending on its order

```bash
npx dbmate down
```

4. Migrate the updated table schema to your local database

```bash
npx dbmate up
```

### Example

If this is the order of migrations:

`users` table: 1st migration <br>
`decks` table: 2nd migration <br>
`cards` table: 3rd migration (latest)

### Updating the `cards` table schema (Latest Migration):

1. Edit the `cards` schema file contents - `20241119140621_cards.sql`
2. Roll back the migrations **only once**

```bash
npx dbmate down

# Output:
# Rolling back: 20241119140621_cards.sql
# Rolled back: 20241119140621_cards.sql
# Writing: ./db/schema.sql
```

3. Migrate the updated table schema to your local database

```bash
npx dbmate up

# Output:
# Applying: 20241119140621_cards.sql
# Applied: 20241119140621_cards.sql
# Writing: ./db/schema.sql
```

### Modifying the `users` table schema (1st Migration):

1. Edit the `users` migration file.

2. Roll back the migrations **three times**

```bash
npx dbmate down # rolls back the cards first

# Output:
# Rolling back: 20241119140621_cards.sql
# Rolled back: 20241119140621_cards.sql
# Writing: ./db/schema.sql

npx dbmate down # then rolls back the decks

# Output:
# Rolling back: 20241119140539_decks.sql
# Rolled back: 20241119140539_decks.sql
# Writing: ./db/schema.sql

npx dbmate down # finally rolls back the users

# Output:
# Rolling back: 20241119140502_users.sql
# Rolled back: 20241119140502_users.sql
# Writing: ./db/schema.sql
```

4. Migrate the updated table schema to your local database

```bash
npx dbmate up

# Output:
# Applying: 20241119140621_cards.sql
# Applied: 20241119140621_cards.sql
# Writing: ./db/schema.sql
```

## Linting

Lint the frontend

```bash
cd frontend
npm run lint
```

Lint the backend

```bash
cd backend
npm run lint
```

## Testing

Lint the frontend

```bash
npm run test-frontend
```

or

```bash
cd frontend
npm run test
```

Lint the backend

```bash
npm run test-backend
```

or

```bash
cd backend
npm run test
```

To test specific file(s), simply add a name that the test file(s) name matches or contains

```bash
npm run test-frontend [nameHere]
```

or

```bash
npm run test-backend [nameHere]
```
