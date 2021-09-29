import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const Card = ({ children, className, onClick }) => (
  <div className={`${classes.cardWrapper} ${className}`} onClick={onClick}>
    {children}
  </div>
);

Card.propTypes = propTypes;

export default Card;
