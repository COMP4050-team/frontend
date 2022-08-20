import { createClient } from '@urql/core';

export const client = createClient({
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://comp4050-square-api.fly.dev/query'
      : 'http://localhost:8081/query',
});
