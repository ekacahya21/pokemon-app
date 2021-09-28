import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

import Modal from 'Components/Modal';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';

import { SIGNUP_USER } from '../../graphQL/mutations';
import classes from './style.scss';

const propTypes = {
  intl: PropTypes.object,
  isOpen: PropTypes.bool,
  onLogin: PropTypes.func,
  onClose: PropTypes.func,
};

const SignupDialog = ({ isOpen, onLogin, onClose, intl: { formatMessage } }) => {
  const [signUp, { error, data }] = useMutation(SIGNUP_USER);
  const emailEl = useRef(null);
  const usernameEl = useRef(null);
  const passwordEl = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('registered!', data);
  }, [data]);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = emailEl.current.value;
    const username = usernameEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0) {
      return false;
    }

    signUp({
      variables: {
        email,
        username,
        password,
      },
    })
      .then(() => {})
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`${err}`);
      });
  };

  if (error) {
    toast.error(error.message, { position: 'bottom-center', hideProgressBar: true });
  }

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <form onSubmit={handleSignup}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="signup_title" />
          </strong>
        </div>
        <div className={classes.content}>
          <div className={classes.inputField}>
            <TextInput icon="email" placeholder={formatMessage({ id: 'signup_email_placeholder' })} ref={emailEl} />
          </div>
          <div className={classes.inputField}>
            <TextInput
              icon="player"
              placeholder={formatMessage({ id: 'signup_username_placeholder' })}
              ref={usernameEl}
            />
          </div>
          <div className={classes.inputField}>
            <TextInput
              type="password"
              icon="pokedex"
              placeholder={formatMessage({ id: 'signup_password_placeholder' })}
              ref={passwordEl}
            />
          </div>
        </div>
        <div className={classes.action}>
          <Button label="signup_button" variant="primary" type="submit" />
          <div className={classes.guideSignup}>
            <FormattedMessage id="signup_guide_text" />
          </div>
          <Button label="login_button" variant="secondary" onClick={onLogin} />
        </div>
      </form>
    </Modal>
  );
};

SignupDialog.propTypes = propTypes;

export default injectIntl(SignupDialog);
