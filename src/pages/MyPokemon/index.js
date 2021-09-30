import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

import PokemonCard from 'Components/PokemonCard';
import PokemonPageError from 'Components/PokemonPageError';
import Loader from 'Components/Loader';
import CatchPokemonModal from 'Components/CatchPokemonModal';
import Icon from 'Components/Icon';
import Card from 'Components/Card';

import { AppContext } from 'Utils/StoreProvider';
import { setAuthModal, setProfileInfo } from 'Utils/actions';
import { GET_PROFILE } from '../../graphQL/queries';
import classes from './style.scss';

const MyPokemon = () => {
  const [profileData, setProfileData] = useState({});
  const [state, dispatch] = useContext(AppContext);
  const [getProfile, { error, data, loading }] = useLazyQuery(GET_PROFILE);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [catchModalOpen, setCatchModalOpen] = useState(false);

  const handleRelease = (pokemonTarget) => {
    setSelectedPokemon(pokemonTarget);
    setCatchModalOpen(true);
  };

  const closeReleaseModal = () => {
    setCatchModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    if (!state.isAuthenticated) {
      dispatch(setAuthModal(true));
    } else {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (data && data.getProfile) {
      dispatch(setProfileInfo(data.getProfile));
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
        <div>
          <div className={classes.title}>
            <strong>{`Hi, ${profileData.username}`}</strong>
          </div>
          <div className={classes.subtitle}>
            <FormattedMessage id="mypokemon_header_subtitle" />
          </div>
        </div>
        <Card className={classes.logout} onClick={handleLogout}>
          <Icon name="logout" />
        </Card>
      </div>
      <div className={classes.pokemonList}>
        {profileData.catchedPokemons && profileData.catchedPokemons.length > 0 ? (
          profileData.catchedPokemons.map((pokemon, key) => (
            <PokemonCard pokemon={pokemon} key={key} isOwnedPokemon onSelectPokemon={handleRelease} />
          ))
        ) : (
          <PokemonPageError variant="empty" />
        )}
      </div>
      <CatchPokemonModal isOpen={catchModalOpen} pokemon={selectedPokemon} onClose={closeReleaseModal} isRelease />
    </div>
  );
};

export default MyPokemon;
