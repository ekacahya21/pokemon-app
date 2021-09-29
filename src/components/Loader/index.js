import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  transparent: PropTypes.bool,
};

const Loader = ({ isLoading, transparent }) => (
  <div
    className={`${classes.loaderComponent} ${isLoading ? classes.showLoader : ''} ${
      transparent ? classes.transparent : ''
    }`}
  >
    <img src="/src/static/images/vector/pokeball.svg" alt="Loading..." />
  </div>
);

Loader.propTypes = propTypes;

export default Loader;
