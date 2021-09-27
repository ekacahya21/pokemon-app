import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'Components/Button';

import history from '../../utils/history';
import classes from './style.scss';

const NotFound = () => {
  const backToHome = () => {
    history.push('/');
  };
  return (
    <div className={classes.notFoundWrapper}>
      <div className={classes.imageWrapper}>
        <img src="/src/static/images/compass.png" alt="Not Found" />
      </div>
      <div className={classes.infoWrapper}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="not_found_title" />
          </strong>
        </div>
        <FormattedMessage id="not_found_text" />
        <div className={classes.actionWrapper}>
          <Button label="not_found_backtohome" variant="secondary" onClick={backToHome} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
