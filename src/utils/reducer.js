import { SET_AUTHENTICATED, SET_AUTH_MODAL, SET_AUTH_MODAL_MODE, SET_PROFILE_INFO } from './constants';

const Reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.state, token: action.token };
    case SET_AUTH_MODAL:
      return { ...state, authModalOpen: action.open };
    case SET_AUTH_MODAL_MODE:
      return { ...state, authMode: action.mode };
    case SET_PROFILE_INFO:
      return { ...state, profileInfo: action.userInfo };
    default:
      return state;
  }
};

export default Reducer;
