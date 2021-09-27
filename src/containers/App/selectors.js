import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectApp = (state) => state.app || initialState;

const selectIsLoading = createSelector(selectApp, (appState) => appState.isLoading);
const selectPopup = createSelector(selectApp, (appState) => appState.popup);
const selectConfig = createSelector(selectApp, (appState) => appState.config);

export { selectIsLoading, selectPopup, selectConfig };
