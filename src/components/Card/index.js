import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Card = ({ children, className }) => <div className={`${classes.cardWrapper} ${className}`}>{children}</div>;

Card.propTypes = propTypes;

export default Card;
