import { SET_AUTHENTICATED, SET_AUTH_MODAL_MODE, SET_AUTH_MODAL } from './constants';

export const setAuthenticated = (state, token) => ({ type: SET_AUTHENTICATED, state, token });
export const setAuthModalMode = (mode) => ({ type: SET_AUTH_MODAL_MODE, mode });
export const setAuthModal = (open) => ({ type: SET_AUTH_MODAL, open });
