import { CHANGE_LOCALE, LOAD_TRANSLATION, LOAD_TRANSLATION_SUCCESS, LOAD_TRANSLATION_FAILED } from './constants';

export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale,
  };
}

export function loadTranslation() {
  return {
    type: LOAD_TRANSLATION,
  };
}

export function translationLoaded(translations) {
  return {
    type: LOAD_TRANSLATION_SUCCESS,
    translations,
  };
}

export function translationLoadingError(error) {
  return {
    type: LOAD_TRANSLATION_FAILED,
    error,
  };
}
