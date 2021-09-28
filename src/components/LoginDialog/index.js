import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import Modal from 'Components/Modal';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';

import { AppContext } from 'Utils/StoreProvider';
import { LOGIN_USER } from '../../graphQL/queries';
import classes from './style.scss';

const propTypes = {
  intl: PropTypes.object,
  onSignup: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

const LoginDialog = ({ isOpen, onSignup, onClose, intl: { formatMessage } }) => {
  const [state] = useContext(AppContext);
  const [login, { error, data, loading }] = useLazyQuery(LOGIN_USER);

  const userIDEl = useRef(null);
  const passwordEl = useRef(null);

  useEffect(() => {
    if (data && data.login && !state.isAuthenticated) {
      localStorage.setItem('token', data.login.token);
      window.location.reload(false);
    }
  }, [data]);

  const handleLogin = (e) => {
    e.preventDefault();
    const userID = userIDEl.current.value;
    const password = passwordEl.current.value;

    if (userID.trim().length === 0 || password.trim().length === 0 || loading) {
      return false;
    }

    login({ variables: { userID, password } });
  };

  if (error) {
    toast.error(error.message, {
      position: 'bottom-center',
      hideProgressBar: true,
    });
  }

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <form onSubmit={handleLogin}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="login_title" />
          </strong>
        </div>
        <div className={classes.content}>
          <div className={classes.inputField}>
            <TextInput icon="player" placeholder={formatMessage({ id: 'login_id_placeholder' })} ref={userIDEl} />
          </div>
          <div className={classes.inputField}>
            <TextInput
              type="password"
              icon="pokedex"
              placeholder={formatMessage({ id: 'login_password_placeholder' })}
              ref={passwordEl}
            />
          </div>
        </div>
        <div className={classes.action}>
          <Button disabled={loading} label="login_button" variant="primary" type="submit" />
          <div className={classes.guideSignup}>
            <FormattedMessage id="login_guide_text" />
          </div>
          <Button label="signup_button" variant="secondary" onClick={onSignup} />
        </div>
      </form>
    </Modal>
  );
};

LoginDialog.propTypes = propTypes;

export default injectIntl(LoginDialog);
