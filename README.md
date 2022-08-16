#### TS - GRAPHQL - APOLLO-SERVER - NEXUS - PRISMA
---

# GraphQL Server Example with `express-graphql`

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- [**Express GraphQL**](https://github.com/graphql/express-graphql): Express middleware for GraphQL HTTP servers   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

## Contents

- [Getting Started](#getting-started)
- [Using the GraphQL API](#using-the-graphql-api)
- [Evolving the app](#evolving-the-app)
- [Switch to another database (e.g. PostgreSQL, MySQL, SQL Server)](#switch-to-another-database-eg-postgresql-mysql-sql-server)
- [Next steps](#next-steps)

## Getting started

### 1. Download example and install dependencies

Download this example:

```
curl -LJO 'https://github.com/sinhaGuild/pg-nexus-ts-gql/archive/refs/heads/main.zip'
```

Install npm dependencies:

```

cd api
yarn install
yarn run dev
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:sinhaGuild/pg-nexus-ts-gql.git --depth=1
```

Install npm dependencies:

```
cd api/
yarn install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
yarn run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).
# pg-nexus-ts-gql
