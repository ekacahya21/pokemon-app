import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import Modal from 'Components/Modal';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';

import { toTitlecase } from 'Utils/helpers';
import { CATCH_POKEMON } from '../../graphQL/mutations';
import config from '../../../config';
import classes from './style.scss';

const propTypes = {
  intl: PropTypes.object,
  isOpen: PropTypes.bool,
  pokemon: PropTypes.object,
  onClose: PropTypes.func,
};

const CatchPokemonModal = ({ isOpen, pokemon, onClose, intl: { formatMessage } }) => {
  const [catchPokemon, { error }] = useMutation(CATCH_POKEMON);
  const nicknameEl = useRef(null);

  const handleCatchPokemon = (e) => {
    e.preventDefault();
    const nickname = nicknameEl.current.value;

    if (nickname.trim().length === 0) {
      return false;
    }

    catchPokemon({ variables: { nickname, refId: pokemon.id } })
      .then(() => {
        toast.success(formatMessage({ id: 'browse_pokemon_save_success' }), {
          position: 'top-right',
        });
        onClose();
      })
      .catch((err) => {
        toast.error(err.message, { position: 'top-right' });
      });
  };

  if (error) {
    toast.error(error.message, { position: 'bottom-center' });
  }

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <form onSubmit={handleCatchPokemon}>
        <div className={classes.nickname}>
          <strong>{!isEmpty(pokemon) && toTitlecase(pokemon.name)}</strong>
        </div>
        <div className={classes.image}>
          {!isEmpty(pokemon) && (
            <img src={config.api.imageUrl.replace('$id', pokemon.id || pokemon.refId)} alt={pokemon.name} />
          )}
        </div>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="catch_pokemon_title" />
          </strong>
        </div>
        <div className={classes.content}>
          <div className={classes.inputField}>
            <TextInput
              icon="pokeball"
              placeholder={formatMessage({ id: 'catch_pokemon_placeholder' })}
              ref={nicknameEl}
            />
          </div>
        </div>
        <div className={classes.action}>
          <Button label="catch_pokemon_save" variant="primary" type="submit" />
        </div>
      </form>
    </Modal>
  );
};

CatchPokemonModal.propTypes = propTypes;

export default injectIntl(CatchPokemonModal);
