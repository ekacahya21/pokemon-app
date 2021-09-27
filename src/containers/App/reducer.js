import produce from 'immer';
import merge from 'lodash/merge';

import {
  SET_CONFIG,
  APP_ERROR,
  API_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_POPUP,
  HIDE_POPUP,
  SET_PAUSED,
  SET_ASSET_IMAGES,
  SKIP_API_POPUPERROR,
} from './constants';

export const initialState = {
  isLoading: false,
  isPaused: false,
  skipApiErrorPopup: true,
  config: {},
  assetImages: {},
  popup: {
    isOpen: false,
    title: null,
    message: null,
    actions: [],
  },
  apiError: null,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_PAUSED:
        draft.isPaused = action.isPaused;
        break;
      case SHOW_LOADER:
        draft.isLoading = true;
        break;
      case HIDE_LOADER:
        draft.isLoading = false;
        break;
      case SET_CONFIG:
        draft.config = action.config;
        break;
      case APP_ERROR:
        draft.error = action.error;
        break;
      case API_ERROR:
        draft.apiError = action.apiError;
        break;
      case SKIP_API_POPUPERROR:
        draft.skipApiErrorPopup = action.value;
        break;
      case SHOW_POPUP:
        draft.popup = {
          isOpen: true,
          title: null,
          message: null,
          actions: [],
        };
        draft.popup = merge(draft.popup, action.popup);
        break;
      case HIDE_POPUP:
        draft.popup = {
          ...draft.popup,
          isOpen: false,
        };
        break;
      case SET_ASSET_IMAGES:
        draft.assetImages = action.assets;
        break;
    }
  });

export default appReducer;
