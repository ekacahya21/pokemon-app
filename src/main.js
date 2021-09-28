import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import LanguageProvider from 'Components/LanguageProvider';
import AppContainer from 'Components/App';
import history from './utils/history';

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <LanguageProvider>
      <Router history={history}>
        <AppContainer />
      </Router>
    </LanguageProvider>,
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
  module.hot.accept('./components/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

module.hot.accept();
