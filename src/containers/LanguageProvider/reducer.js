import produce from 'immer';
import _ from 'lodash';

import { CHANGE_LOCALE, DEFAULT_LOCALE, LOAD_TRANSLATION_SUCCESS, LOAD_TRANSLATION_FAILED } from './constants';
import idLocaleData from '../../i18n/id';
import enLocaleData from '../../i18n/en';

export const initialState = {
  locale: DEFAULT_LOCALE,
  messages: {
    id: { ...idLocaleData },
    en: { ...enLocaleData },
  },
  error: null,
};

// * state key that will stored to localStorage
export const storedKey = ['locale'];

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
      case LOAD_TRANSLATION_SUCCESS:
        draft.messages = _.merge(draft.messages, action.translations);
        break;
      case LOAD_TRANSLATION_FAILED:
        draft.error = action.error;
        break;
    }
  });

export default languageProviderReducer;
