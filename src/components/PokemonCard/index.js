import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

import Card from 'Components/Card';
import { toTitlecase, normalize } from 'Utils/helpers';
import config from '../../../config';
import classes from './style.scss';

const propTypes = {
  pokemon: PropTypes.object,
};

const PokemonCard = ({ pokemon }) => (
  <Card className={classes.pokemonWrapper}>
    <div className={classes.header}>
      <div className={classes.nickname}>
        <strong>{toTitlecase(pokemon.nickname)}</strong>
      </div>
      <div className={classes.originalname}>
        <strong>
          <FormattedMessage id="pokemon_original_name" />
        </strong>
        &nbsp;
        {toTitlecase(pokemon.detail.name)}
      </div>
    </div>
    <div className={classes.detail}>
      <div className={classes.image}>
        <img src={config.api.imageUrl.replace('$id', pokemon.refId)} alt={pokemon.detail.name} />
      </div>
      <div className={classes.ability}>
        <strong>
          <FormattedMessage id="pokemon_ability" />
        </strong>
        &nbsp;
        {map(pokemon.detail.abilities, (abilityObj) => toTitlecase(normalize(abilityObj.ability.name))).join(', ')}
      </div>
    </div>
  </Card>
);

PokemonCard.propTypes = propTypes;

export default PokemonCard;
