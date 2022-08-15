import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createClient, Provider } from 'urql';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://comp4050-square-api.fly.dev/query'
        : 'http://localhost:8000/query',
  });

  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
