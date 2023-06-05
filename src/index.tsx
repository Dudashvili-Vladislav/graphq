import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './app/App';
// import './shared/config/i18n/i18n';

import 'app/styles/index.scss';

const apiKey = process.env.REACT_APP_AUTH_HEADER || '';
const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${apiKey}`,
    },
});

const baseUrl = '/graphql';
render(
    <ApolloProvider client={client}>
        <BrowserRouter basename={baseUrl}>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
);