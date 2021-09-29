import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { map, has } from 'lodash';

import Card from 'Components/Card';
import Button from 'Components/Button';

import { toTitlecase, normalize } from 'Utils/helpers';
import config from '../../../config';
import classes from './style.scss';

const propTypes = {
  isOwnedPokemon: PropTypes.bool,
  onSelectPokemon: PropTypes.func,
  pokemon: PropTypes.object,
};

const PokemonCard = ({ pokemon, onSelectPokemon, isOwnedPokemon }) => {
  const pokemonDetail = has(pokemon, 'detail') ? pokemon.detail : pokemon;

  const handleSelectPokemon = () => {
    onSelectPokemon(pokemonDetail);
  };

  const handleRelease = () => {};

  return (
    <Card className={classes.pokemonWrapper}>
      <div className={classes.header}>
        {isOwnedPokemon ? (
          <>
            <div className={classes.nickname}>
              <strong>{toTitlecase(pokemon.nickname)}</strong>
            </div>
            <div className={classes.originalname}>
              <strong>
                <FormattedMessage id="pokemon_original_name" />
              </strong>
              &nbsp;
              {toTitlecase(pokemonDetail.name)}
            </div>
          </>
        ) : (
          <div className={classes.nickname}>
            <strong>{toTitlecase(pokemon.name)}</strong>
          </div>
        )}
      </div>
      <div className={classes.detail}>
        <div className={classes.image}>
          <img src={config.api.imageUrl.replace('$id', pokemon.id || pokemon.refId)} alt={pokemonDetail.name} />
        </div>
        <div className={classes.ability}>
          <strong>
            <FormattedMessage id="pokemon_ability" />
          </strong>
          &nbsp;
          {map(pokemonDetail.abilities, (abilityObj) => toTitlecase(normalize(abilityObj.ability.name))).join(', ')}
        </div>
      </div>
      <div className={classes.action}>
        <Button
          label={isOwnedPokemon ? 'pokemon_release_button_label' : 'browse_pokemon_catch'}
          variant="primary"
          className={classes.actionBtn}
          onClick={isOwnedPokemon ? handleRelease : handleSelectPokemon}
        />
        <Button label="browse_pokemon_detail" variant="secondary" className={classes.actionBtn} />
      </div>
    </Card>
  );
};

PokemonCard.propTypes = propTypes;

export default PokemonCard;
