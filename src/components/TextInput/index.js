import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Icon from 'Components/Icon';
import classes from './style.scss';

const propTypes = {
  icon: PropTypes.string,
};

const TextInput = forwardRef(({ icon, ...rest }, ref) => {
  return (
    <div className={classes.inputWithIcon}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input type="text" {...rest} ref={ref} />
      <Icon name={icon} className={classes.inputIcon} />
    </div>
  );
});

TextInput.propTypes = propTypes;

export default TextInput;
