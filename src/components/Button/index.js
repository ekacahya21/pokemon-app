import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.scss';

const propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconStyle: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  disabled: PropTypes.string,
  className: PropTypes.string,
};

const Button = ({ variant, label, icon, iconStyle, size, className, disabled, ...rest }) => {
  const props = {
    ...rest,
    className: `${classes[variant]} ${disabled ? classes.disabled : ''} ${className}`,
  };
  return (
    // eslint-disable-next-line react/button-has-type, react/jsx-props-no-spreading
    <button {...props}>
      <FormattedMessage id={label} />
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  variant: 'primary',
};

export default Button;
