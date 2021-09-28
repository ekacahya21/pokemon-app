import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import Modal from 'Components/Modal';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';

import classes from './style.scss';

const propTypes = {
  intl: PropTypes.object,
  isOpen: PropTypes.bool,
};

const LoginDialog = ({ isOpen, intl: { formatMessage } }) => (
  <Modal isOpen={isOpen}>
    <div className={classes.title}>
      <strong>
        <FormattedMessage id="login_title" />
      </strong>
    </div>
    <div className={classes.content}>
      <div className={classes.inputField}>
        <TextInput icon="player" placeholder={formatMessage({ id: 'login_id_placeholder' })} />
      </div>
      <div className={classes.inputField}>
        <TextInput type="password" icon="pokedex" placeholder={formatMessage({ id: 'login_password_placeholder' })} />
      </div>
    </div>
    <div className={classes.action}>
      <Button label="login_button" variant="primary" onClick={() => {}} />
      <div className={classes.guideSignup}>
        <FormattedMessage id="login_guide_text" />
      </div>
      <Button label="signup_button" variant="secondary" onClick={() => {}} />
    </div>
  </Modal>
);

LoginDialog.propTypes = propTypes;

export default injectIntl(LoginDialog);
