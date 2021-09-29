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
import { CATCH_POKEMON, RELEASE_POKEMON } from '../../graphQL/mutations';
import { GET_PROFILE } from '../../graphQL/queries';
import config from '../../../config';
import classes from './style.scss';

const propTypes = {
  intl: PropTypes.object,
  isOpen: PropTypes.bool,
  isRelease: PropTypes.bool,
  pokemon: PropTypes.object,
  onClose: PropTypes.func,
};

const CatchPokemonModal = ({ isOpen, isRelease, pokemon, onClose, intl: { formatMessage } }) => {
  const [catchPokemon] = useMutation(CATCH_POKEMON, { refetchQueries: [{ query: GET_PROFILE }] });
  const [releasePokemon] = useMutation(RELEASE_POKEMON, { refetchQueries: [{ query: GET_PROFILE }] });
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

  const handleReleasePokemon = () => {
    releasePokemon({ variables: { nickname: pokemon.nickname } })
      .then(() => {
        toast.success(formatMessage({ id: 'mypokemon_release_success' }), {
          position: 'top-right',
        });
        onClose();
      })
      .catch((err) => {
        toast.error(err.message, { position: 'top-right' });
      });
  };

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <div className={classes.nickname}>
        <strong>{!isEmpty(pokemon) && toTitlecase(isRelease ? pokemon.nickname : pokemon.name)}</strong>
      </div>
      <div className={classes.image}>
        {!isEmpty(pokemon) && (
          <img src={config.api.imageUrl.replace('$id', pokemon.id || pokemon.refId)} alt={pokemon.name} />
        )}
      </div>
      {isRelease ? (
        <>
          <div className={classes.title}>
            <strong>
              <FormattedMessage id="mypokemon_release_confirm" />
            </strong>
          </div>
          <div className={classes.action}>
            <Button label="pokemon_release_button_label" variant="primary" onClick={handleReleasePokemon} />
            <Button label="mypokemon_release_button_cancel" variant="secondary" onClick={onClose} />
          </div>
        </>
      ) : (
        <form onSubmit={handleCatchPokemon}>
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
      )}
    </Modal>
  );
};

CatchPokemonModal.propTypes = propTypes;

export default injectIntl(CatchPokemonModal);
