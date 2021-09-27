import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Loader from 'Components/Loader';
import ClientRoutes from '../../routes';

import '../../styles/core.scss';

const propTypes = {
  isLoading: PropTypes.bool,
};

const App = ({ isLoading }) => {
  return (
    <>
      <ClientRoutes />
      <Loader isLoading={isLoading} />
    </>
  );
};

App.propTypes = propTypes;

App.defaultProps = {
  isLoading: false,
};

export default memo(App);
