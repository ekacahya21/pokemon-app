import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import browserHistory from 'Utils/history';
import createReducer from './reducers';
import rootSaga from './rootSaga';
import { peristConfig } from './persistence';

const initState = {};

const configureStore = (initialState = {}, history) => {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {
    effectMiddlewares: [],
  };

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const persistedReducer = persistReducer(peristConfig, createReducer());
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers));

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  // run saga
  store.runSaga(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
};

const store = configureStore(initState, browserHistory);

export default store;
export const persistor = persistStore(store);
