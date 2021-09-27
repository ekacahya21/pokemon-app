import {
  GET_CONFIG,
  SET_CONFIG,
  APP_ERROR,
  API_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_POPUP,
  HIDE_POPUP,
  GET_CLIENT_MENU,
  SET_PAUSED,
  GET_ASSET_IMAGES,
  SET_ASSET_IMAGES,
  SKIP_API_POPUPERROR,
} from './constants';

export function setPaused(isPaused) {
  return {
    type: SET_PAUSED,
    isPaused,
  };
}

export function getClientMenu() {
  return {
    type: GET_CLIENT_MENU,
  };
}

export function getConfig() {
  return {
    type: GET_CONFIG,
  };
}

export function setConfig(config) {
  return {
    type: SET_CONFIG,
    config,
  };
}

export function setAppError(error) {
  return {
    type: APP_ERROR,
    error,
  };
}

export function setApiError(apiError) {
  return {
    type: API_ERROR,
    apiError,
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

export function showPopup(popup) {
  return {
    type: SHOW_POPUP,
    popup,
  };
}

export function hidePopup() {
  return {
    type: HIDE_POPUP,
  };
}

export function getAssetImages() {
  return {
    type: GET_ASSET_IMAGES,
  };
}

export function setAssetImages(assets) {
  return {
    type: SET_ASSET_IMAGES,
    assets,
  };
}

export function skipAPIPopupError(value) {
  return {
    type: SKIP_API_POPUPERROR,
    value,
  };
}
