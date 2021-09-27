import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'Components/Loader';
import ClientRoutes from '../../routes';

import { getConfig, getAssetImages } from './actions';
import { selectIsLoading, selectPopup } from './selectors';
import '../../styles/core.scss';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const App = ({ isLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssetImages());
    dispatch(getConfig());
  }, []);

  return (
    <>
      <ClientRoutes />
      <Loader isLoading={isLoading} />
    </>
  );
};

App.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
  popup: selectPopup,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(App);
