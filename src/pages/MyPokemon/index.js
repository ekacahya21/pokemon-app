import React, { useContext, useEffect } from 'react';

import Unauthorized from 'Components/Unauthorized';

import { AppContext } from 'Utils/StoreProvider';
import { setAuthModal } from 'Utils/actions';

import classes from './style.scss';

const MyPokemon = () => {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      dispatch(setAuthModal(true));
    }
  }, []);

  return !state.isAuthenticated ? (
    <Unauthorized />
  ) : (
    <div className={classes.myPokemonWrapper}>
      <h1>Hi from mypokemon page</h1>
    </div>
  );
};

export default MyPokemon;
