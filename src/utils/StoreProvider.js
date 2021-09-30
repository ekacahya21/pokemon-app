import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import Reducer from './reducer';

const propTypes = {
  children: PropTypes.node,
};

const initialState = {
  isAuthenticated: false,
  authModalOpen: false,
  authMode: 'login',
  profileInfo: {},
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

StoreProvider.propTypes = propTypes;

export const AppContext = createContext(initialState);
export default StoreProvider;
