import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createClient, Provider } from 'urql';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url: 'https://comp4050-square-api.fly.dev/query',
  });

  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
