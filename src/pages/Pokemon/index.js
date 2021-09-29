import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { isEmpty, map } from 'lodash';

import Loader from 'Components/Loader';
import Card from 'Components/Card';
import PokemonPageError from 'Components/PokemonPageError';

import { toTitlecase, normalize } from 'Utils/helpers';
import { POKEMON_SINGLE } from '../../graphQL/queries';
import config from '../../../config';
import classes from './style.scss';

const propTypes = {
  match: PropTypes.object,
};

const Pokemon = ({ match }) => {
  const [pokemonDetail, setPokemonDetail] = useState({});
  const { params } = match;
  const { data, loading, error } = useQuery(POKEMON_SINGLE, { variables: { id: params.id } });

  useEffect(() => {
    if (data && data.pokemonSingle) {
      setPokemonDetail(data.pokemonSingle);
    }
  }, [data]);

  if (error) {
    toast.error(error.message, { position: 'top-right' });
    return <PokemonPageError variant="error" />;
  }

  return !isEmpty(pokemonDetail) ? (
    <div className={classes.pokemonDetailWrapper}>
      <div className={classes.header}>
        <div className={classes.subtitle}>PokemonInfo</div>
        <div className={classes.title}>{toTitlecase(pokemonDetail.name)}</div>
      </div>
      <div className={classes.content}>
        <Card className={classes.generalInfo}>
          <div className={classes.image}>
            <img src={config.api.imageUrl.replace('$id', pokemonDetail.id)} alt={pokemonDetail.name} />
          </div>
          <div className={classes.species}>
            <strong>
              <FormattedMessage id="pokemon_species" />
            </strong>
            <div className={classes.value}>{pokemonDetail.species && toTitlecase(pokemonDetail.species.name)}</div>
          </div>
          <div className={classes.abilities}>
            <strong>
              <FormattedMessage id="pokemon_ability" />
            </strong>
            <div className={classes.value}>
              {map(pokemonDetail.abilities, (abilityObj) => toTitlecase(normalize(abilityObj.ability.name))).join(', ')}
            </div>
          </div>
          <div className={classes.types}>
            <strong>
              <FormattedMessage id="pokemon_types" />
            </strong>
            <div className={classes.value}>
              {map(pokemonDetail.types, (typesObj) => toTitlecase(typesObj.type.name)).join(', ')}
            </div>
          </div>
          <div className={classes.moves}>
            <strong>
              <FormattedMessage id="pokemon_moves" />
            </strong>
            <div className={classes.value}>
              {map(pokemonDetail.moves, (abilityObj) => toTitlecase(abilityObj.move.name)).join(', ')}
            </div>
          </div>
        </Card>
      </div>
    </div>
  ) : (
    <Loader isLoading={loading} />
  );
};

Pokemon.propTypes = propTypes;

export default Pokemon;
