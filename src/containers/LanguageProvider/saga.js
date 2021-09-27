import { call, put, takeLatest } from 'redux-saga/effects';

import { getTranslations } from 'Domain/WCMS';
import { LOAD_TRANSLATION } from './constants';
import { translationLoaded, translationLoadingError } from './actions';

export function* getTranslationData() {
  try {
    const translations = yield call(getTranslations);
    yield put(translationLoaded(translations));
  } catch (err) {
    yield put(translationLoadingError(err));
  }
}

export default function* translationData() {
  yield takeLatest(LOAD_TRANSLATION, getTranslationData);
}
