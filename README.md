# Developement

## Installation

Install the required node modules:

```bash
yarn
```

## Preview the project

First, run the backend:

```
git clone git@github.com:COMP4050-team/api.git
make run
```

This will start the GraphQL API locally on port 8080.
Then start the front end in hot reload mode.

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can interact with the GraphQL API via your browser by visiting http://localhost:8080

---

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## GraphQL Code Generation

This will reach out to our GraphQL API and generate typescript code based on the queries and mutations that have been defined in `./gql/**/*.graphql`

```bash
yarn generate # production
yarn generate-dev # dev
```

## Deployment

The main branch will automatically be deployed on the [Vercel Platform](https://vercel.com)

## NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
