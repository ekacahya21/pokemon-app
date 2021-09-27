/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch } from 'react-router-dom';

import RouteControl from 'Components/RouteControl';
import routes from './routes';

const ClientRoutes = () => (
  <Switch>
    {routes.map((route, index) => {
      return route.subRoutes && route.subRoutes.length > 0 ? (
        route.subRoutes.map((subRoute, subIndex) => (
          <RouteControl
            exact
            key={`subroute_${subIndex}`}
            {...route}
            {...subRoute}
            path={`${route.path}${subRoute.path}`}
            component={subRoute.component}
          />
        ))
      ) : (
        <RouteControl key={`route_${index}`} exact {...route} plain={route.plain} step={route.step} />
      );
    })}
  </Switch>
);

export default ClientRoutes;
