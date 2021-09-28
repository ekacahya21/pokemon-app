import React, { memo, useContext, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

import Navigation from 'Components/Navigation';
import SignupDialog from 'Components/SignupDialog';
import LoginDialog from 'Components/LoginDialog';

import { AppContext } from 'Utils/StoreProvider';
import { setAuthModalMode, setAuthModal, setAuthenticated } from 'Utils/actions';
import ClientRoutes from '../../routes';
import '../../styles/core.scss';

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

const App = () => {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !state.isAuthenticated) {
      dispatch(setAuthenticated(true, token));
    }
  }, [state]);

  const setAuthMode = (mode) => () => {
    dispatch(setAuthModalMode(mode));
  };

  const setAuthModalOpen = (openState) => () => {
    dispatch(setAuthModal(openState));
  };

  return (
    <ApolloProvider client={client}>
      <ClientRoutes />
      <Navigation authenticated={false} />
      <ToastContainer />
      <LoginDialog
        isOpen={state.authModalOpen && !state.isAuthenticated && state.authMode === 'login'}
        onSignup={setAuthMode('signup')}
        onClose={setAuthModalOpen(false)}
      />
      <SignupDialog
        isOpen={state.authModalOpen && !state.isAuthenticated && state.authMode === 'signup'}
        onLogin={setAuthMode('login')}
        onClose={setAuthModalOpen(false)}
      />
    </ApolloProvider>
  );
};

export default memo(App);
