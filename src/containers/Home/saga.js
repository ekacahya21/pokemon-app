import { put, takeLatest } from 'redux-saga/effects';

import { setLoading } from './actions';
import { LOAD_POKEMONS } from './constants';

function* loadPokemon() {
  yield put(setLoading(true));
}

export default function* homeSaga() {
  yield takeLatest(LOAD_POKEMONS, loadPokemon);
}
