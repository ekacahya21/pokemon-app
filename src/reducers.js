import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import appReducer from 'Containers/App/reducer';
import languageReducer, { storedKey as storedLanguageState } from 'Containers/LanguageProvider/reducer';
import history from 'Utils/history';
import { mapWithPersistor } from './persistence';

// * reducers that will stored to localStorage
const storedReducers = {
  language: { reducer: languageReducer, whitelist: storedLanguageState },
};

const temporaryReducers = {
  app: appReducer,
};

export default function createRecuer(injectedReducer = {}) {
  const coreReducer = combineReducers({
    router: connectRouter(history),
    form: formReducer,
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
    ...injectedReducer,
  });

  /* eslint-disable no-param-reassign */
  const rootReducer = (state, action) => {
    return coreReducer(state, action);
  };

  return rootReducer;
}
