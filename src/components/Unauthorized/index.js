import Button from 'Components/Button';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { setAuthModal } from 'Utils/actions';
import { AppContext } from 'Utils/StoreProvider';
import classes from './style.scss';

const Unauthorized = () => {
  const [, dispatch] = useContext(AppContext);

  const showLoginModal = () => {
    dispatch(setAuthModal(true));
  };

  return (
    <div className={classes.unauthorizedWrapper}>
      <div className={classes.imageWrapper}>
        <img src="/src/static/images/vector/lock.svg" alt="Not Found" />
      </div>
      <div className={classes.infoWrapper}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="mypokemon_unauthorized_title" />
          </strong>
        </div>
        <div className={classes.content}>
          <FormattedMessage id="mypokemon_unauthorized_info" />
        </div>
        <div className={classes.actionWrapper}>
          <Button label="login_button" variant="primary" onClick={showLoginModal} />
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
