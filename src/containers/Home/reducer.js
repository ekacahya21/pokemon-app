import produce from 'immer';

import { SET_LOADING } from './constants';

export const initialState = {
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default homeReducer;
