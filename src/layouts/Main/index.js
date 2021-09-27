import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Navigation from 'Components/Navigation';

import { selectLocale } from 'Containers/LanguageProvider/selector';
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

const mapStateToProps = createStructuredSelector({
  selectedLocale: selectLocale,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(MainLayout);
