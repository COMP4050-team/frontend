import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, createClient } from 'urql';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ResponsiveDrawer } from '../components/ResponsiveDrawer';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://comp4050-square-api.fly.dev/query'
        : 'http://localhost:8000/query',
  });

  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveDrawer>
          <Component {...pageProps} />
        </ResponsiveDrawer>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
