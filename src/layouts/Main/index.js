import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Navigation from 'Components/Navigation';

import classes from './style.scss';

const propTypes = {
  hideNav: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

const MainLayout = ({ children, hideNav }) => {
  return (
    <>
      <div className={classes.layoutWrapper}>{React.Children.only(children)}</div>
      {!hideNav && <Navigation />}
    </>
  );
};

MainLayout.propTypes = propTypes;

export default memo(MainLayout);
