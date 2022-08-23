import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, makeOperation, createClient, cacheExchange, dedupExchange, fetchExchange } from 'urql';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ResponsiveDrawer } from '../components/ResponsiveDrawer';
import { authExchange } from '@urql/exchange-auth';
import { useEffect, useState } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [clientInitialised, setclientInitialised] = useState(false);
  const [client, setclient] = useState<any>();

  const addAuthToOperation = ({
    authState,
    operation,
  }: {
    authState: any;
    operation: any;
  }) => {
    console.log(authState);
    
    if (!authState || !authState.token) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    console.log('addAuthToOperation', authState);

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: authState.token,
        },
      },
    });
  };

  const getAuth = async ({ authState }: { authState: any }) => {
    if (!authState) {
      const token = localStorage.getItem('token');
      if (token) {
        return { token };
      }
      return null;
    }

    return null;
  };

  useEffect(() => {
    if (clientInitialised) {
      return;
    }

    const newClient = createClient({
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://comp4050-square-api.fly.dev/query'
          : 'http://localhost:8081/query',
      exchanges: [
        // @ts-ignore-next-line
        authExchange({
          addAuthToOperation,
          getAuth,
        }),
        dedupExchange,
        cacheExchange,
        fetchExchange,
      ],
    });

    setclientInitialised(true);
    setclient(newClient);

    console.count('client created');
  }, [clientInitialised]);

  return clientInitialised ? (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveDrawer>
          <Component {...pageProps} />
        </ResponsiveDrawer>
      </ThemeProvider>
    </Provider>
  ) : (
    <p>bad</p>
  );
}

export default MyApp;
