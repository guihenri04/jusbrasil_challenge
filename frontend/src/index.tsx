import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

const getGraphQLUrl = () => {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:4000/graphql';
  }
  return process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4000/graphql';
};

// Configurar Apollo Client
const client = new ApolloClient({
  uri: getGraphQLUrl(),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

console.log('🔗 GraphQL URL:', getGraphQLUrl());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
); 