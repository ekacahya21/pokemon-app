import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const propTypes = {
  hideNav: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
};

/* eslint-disable react/jsx-props-no-spreading */
const RouteControl = ({ component: Component, layout: Layout, hideNav, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const rendered =
        typeof Layout !== 'undefined' ? (
          <Layout hideNav={hideNav}>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        );

      return rendered;
    }}
  />
);

RouteControl.propTypes = propTypes;

export default RouteControl;
