import Button from 'Components/Button';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { setAuthModal } from 'Utils/actions';
import { AppContext } from 'Utils/StoreProvider';
import history from 'Utils/history';
import classes from './style.scss';

const propTypes = {
  variant: PropTypes.string,
};

const PokemonPageError = ({ variant }) => {
  const [, dispatch] = useContext(AppContext);

  const showLoginModal = () => {
    dispatch(setAuthModal(true));
  };

  const goToBrowse = () => {
    history.push('/');
  };

  const state = {
    unauthorized: {
      title: 'mypokemon_unauthorized_title',
      description: 'mypokemon_unauthorized_info',
      image: '/src/static/images/vector/lock.svg',
      action_label: 'login_button',
      action: showLoginModal,
    },
    empty: {
      title: 'mypokemon_empty_title',
      description: 'mypokemon_empty_desc',
      image: '/src/static/images/vector/pikachu.svg',
      action_label: 'mypokemon_empty_button_label',
      action: goToBrowse,
    },
    error: {
      title: 'general_somethingwrong_title',
      description: 'general_somethingwrong_text',
      image: '/src/static/images/vector/pikachu.svg',
      action_label: 'not_found_text',
      action: goToBrowse,
    },
  };

  return (
    <div className={classes.unauthorizedWrapper}>
      <div className={classes.imageWrapper}>
        <img src={state[variant].image} alt="Not Found" />
      </div>
      <div className={classes.infoWrapper}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id={state[variant].title} />
          </strong>
        </div>
        <div className={classes.content}>
          <FormattedMessage id={state[variant].description} />
        </div>
        <div className={classes.actionWrapper}>
          <Button label={state[variant].action_label} variant="primary" onClick={state[variant].action} />
        </div>
      </div>
    </div>
  );
};

PokemonPageError.propTypes = propTypes;

export default PokemonPageError;
