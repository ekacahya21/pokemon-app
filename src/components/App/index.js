import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

import Navigation from 'Components/Navigation';
import Loader from 'Components/Loader';

import AppContext from 'src/contexts/app-context';
import ClientRoutes from '../../routes';
import '../../styles/core.scss';

const propTypes = {
  isLoading: PropTypes.bool,
};

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      // eslint-disable-next-line no-console
      console.log(`Grapqlerror ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: 'http://localhost:9000/gql' })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const App = ({ isLoading }) => {
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider>
        <ClientRoutes />
        <Loader isLoading={isLoading} />
        <Navigation authenticated={false} />
        <ToastContainer />
      </AppContext.Provider>
    </ApolloProvider>
  );
};

App.propTypes = propTypes;

App.defaultProps = {
  isLoading: false,
};

export default memo(App);
