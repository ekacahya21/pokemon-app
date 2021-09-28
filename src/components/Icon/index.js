import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

const Icon = ({ className, name }) => {
  const imagePath = `/src/static/images/vector/${name}.svg`;

  return (
    <div className={`${classes.icon} ${className || ''}`}>
      <img src={imagePath} alt={name} />
    </div>
  );
};

Icon.propTypes = propTypes;

export default Icon;
