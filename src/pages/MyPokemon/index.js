import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

import PokemonCard from 'Components/PokemonCard';
import PokemonPageError from 'Components/PokemonPageError';
import Loader from 'Components/Loader';

import { AppContext } from 'Utils/StoreProvider';
import { setAuthModal } from 'Utils/actions';
import { GET_PROFILE } from '../../graphQL/queries';
import classes from './style.scss';

const MyPokemon = () => {
  const [profileData, setProfileData] = useState({});
  const [state, dispatch] = useContext(AppContext);
  const [getProfile, { error, data, loading }] = useLazyQuery(GET_PROFILE);

  useEffect(() => {
    if (!state.isAuthenticated) {
      dispatch(setAuthModal(true));
    } else {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (data && data.getProfile) {
      setProfileData(data.getProfile);
    }
  }, [data]);

  if (error) {
    toast.error(error.message, { position: 'bottom-center' });
  }

  if (loading) {
    return <Loader isLoading />;
  }

  return !state.isAuthenticated && isEmpty(profileData) ? (
    <PokemonPageError variant="unauthorized" />
  ) : (
    <div className={classes.myPokemonWrapper}>
      <div className={classes.header}>
        <div className={classes.title}>
          <strong>{`Hi, ${profileData.username}`}</strong>
        </div>
        <div className={classes.subtitle}>
          <FormattedMessage id="mypokemon_header_subtitle" />
        </div>
      </div>
      <div className={classes.pokemonList}>
        {profileData.catchedPokemons && profileData.catchedPokemons.length > 0 ? (
          profileData.catchedPokemons.map((pokemon, key) => <PokemonCard pokemon={pokemon} key={key} isOwnedPokemon />)
        ) : (
          <PokemonPageError variant="empty" />
        )}
      </div>
    </div>
  );
};

export default MyPokemon;
