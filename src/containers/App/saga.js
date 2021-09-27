import { call, put, takeLatest } from 'redux-saga/effects';

import { getAssetImages } from 'Domain/WCMS';

import { GET_ASSET_IMAGES } from './constants';
import { setAppError, setAssetImages } from './actions';

export function* getWCMSImage() {
  try {
    const wcmsImages = yield call(getAssetImages);
    yield put(setAssetImages(wcmsImages));
  } catch (error) {
    yield put(setAppError(error));
  }
}

export default function* appSaga() {
  yield takeLatest(GET_ASSET_IMAGES, getWCMSImage);
}
