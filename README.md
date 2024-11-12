## SE 2144 FINAL PROJECT

## Table of Contents

- [Install all dependencies](#install-all-dependencies)
- [Setup Prettier](#setup-prettier-for-code-formatting)
- [Setup local Postgres database](#set-up-local-postgres-database)
- [How to run the app](#how-to-run-the-app)
- [Linting](#linting)

## How to initialize the app

## Install all dependencies

1. Run `npm run install-all` in the root directory

## Setup Prettier for code formatting

1. Install [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for vscode
2. Go to File > Preferences > Settings
3. Search for "Format" in the search bar
4. Select Prettier in the "Default Formatter" dropdown
5. Enable "Format on Save"

## Set up local Postgres database

### Using pgAdmin

1. Open pgAdmin
1. Make a new database named "notetube_dev"
1. Open the query tool in the notetube_dev database
1. Paste and execute `backend/database.sql` contents except the CREATE DATABASE query

### Using terminal

1. Open terminal
2. Run `psql -U postgres`

   if you encounter this error: `psql: command not found`,
   follow this [tutorial](https://www.commandprompt.com/education/how-to-set-windows-path-for-postgres-tools/)

3. Input your password --> `Password for user postgres:`
4. Paste and run `backend/database.sql` contents into prompt

### Add database connection link

Then add a `.env` file in the root folder with the following format without the square brackets:

```
DATABASE_URL= "postgres://postgres:[YOUR_POSTGRES_PASSWORD]@localhost:5432/notetube_dev?sslmode=disable"
```

## How to run the app

### If you're in the root directory:

- Run `npm run backend`
- Run `npm run frontend`

### or you can:

- Navigate to the frontend directory `cd frontend` then `npm run dev`
- Navigate to the backend directory `cd backend` then `npm run dev`

## Linting

- Navigate to the frontend directory `cd frontend` then `npm run lint`
- Navigate to the backend directory `cd backend` then `npm run lint`
