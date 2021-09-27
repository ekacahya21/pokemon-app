import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectLanguage = (state) => state.language || initialState;

export const selectLocale = createSelector(selectLanguage, (langState) => langState.locale);
