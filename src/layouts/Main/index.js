import React, { memo } from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const MainLayout = ({ children }) => {
  return (
    <>
      <div className={classes.layoutWrapper}>{React.Children.only(children)}</div>
    </>
  );
};

MainLayout.propTypes = propTypes;

export default memo(MainLayout);
