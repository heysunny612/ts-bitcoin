import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme.ts';
import Router from './routes/Router.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
