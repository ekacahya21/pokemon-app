import React from 'react';
import loadable from '../../utils/loadable';
import Loader from '../Loader';

export default loadable(() => import('./index'), {
  fallback: <Loader isLoading />,
});
