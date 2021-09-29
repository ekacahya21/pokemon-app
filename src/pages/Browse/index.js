import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

import Loader from 'Components/Loader';
import PokemonCard from 'Components/PokemonCard';
import PokemonPageError from 'Components/PokemonPageError';
import CatchPokemonModal from 'Components/CatchPokemonModal';

import { FETCH_POKEMONS } from '../../graphQL/queries';
import classes from './style.scss';

const propTypes = {
  intl: PropTypes.object,
};

const Browse = ({ intl: { formatMessage } }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [isCatching, setIsCatching] = useState(false);
  const [catchModalOpen, setCatchModalOpen] = useState(false);
  const [pokemons, { error, data, loading }] = useLazyQuery(FETCH_POKEMONS);

  const handleCatch = (pokemonTarget) => {
    setSelectedPokemon(pokemonTarget);
    setIsCatching(true);
    setTimeout(() => {
      if (Math.random() <= 0.5) {
        toast.success(formatMessage({ id: 'browse_pokemon_catch_success' }), { position: 'top-right' });
        setCatchModalOpen(true);
      } else {
        toast.error(formatMessage({ id: 'browse_pokemon_catch_failed' }), { position: 'top-right' });
      }
      setIsCatching(false);
    }, 2000);
  };

  const closeCatchModal = () => {
    setCatchModalOpen(false);
  };

  const getPokemons = (page, limit = 30) => {
    pokemons({ variables: { page, limit } });
  };

  useEffect(() => {
    getPokemons(1);
  }, []);

  useEffect(() => {
    if (data && data.pokemons) {
      setPokemonList(data.pokemons);
    }
  }, [data]);

  if (error) {
    toast.error(error.message, { position: 'top-right' });
  }

  return (
    <div className={classes.browsePokemonWrapper}>
      <div className={classes.header}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="browse_pokemon_title" />
          </strong>
        </div>
        <div className={classes.subtitle}>
          <FormattedMessage id="browse_pokemon_subtitle" />
        </div>
      </div>
      <div className={classes.pokemonList}>
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon, key) => <PokemonCard pokemon={pokemon} key={key} onSelectPokemon={handleCatch} />)
        ) : (
          <PokemonPageError variant="empty" />
        )}
      </div>
      <CatchPokemonModal isOpen={catchModalOpen} pokemon={selectedPokemon} onClose={closeCatchModal} />
      <Loader isLoading={loading || isCatching} transparent={isCatching} />
    </div>
  );
};

Browse.propTypes = propTypes;

export default injectIntl(Browse);
