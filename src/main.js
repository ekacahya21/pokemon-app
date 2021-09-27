import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LanguageProvider from 'Containers/LanguageProvider';
import AppContainer from 'Containers/App';
import history from 'Utils/history';
import store, { persistor } from './configureStore';

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LanguageProvider>
          <ConnectedRouter history={history}>
            <AppContainer />
          </ConnectedRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>,
    MOUNT_NODE
  );
};

if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en'), import('intl/locale-data/jsonp/id')])) // eslint-disable-line prettier/prettier
    .then(() => render())
    .catch((err) => {
      throw err;
    });
} else {
  render();
}

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

module.hot.accept();
