import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Loader = ({ isLoading }) => (
  <div className={`${classes.loaderComponent} ${isLoading ? classes.showLoader : ''}`}>
    <img src="/src/static/images/vector/pokeball.svg" alt="Loading..." />
  </div>
);

Loader.propTypes = propTypes;

export default Loader;
