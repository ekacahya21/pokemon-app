import React, { useState } from 'react';

import NavItem from 'Components/NavItem';

import { NAVIGATION_MENU } from '../../utils/constants';
import classes from './style.scss';

const Navigation = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className={classes.navigationWrapper}>
      {NAVIGATION_MENU.map((item, index) => (
        <NavItem
          key={index}
          label={item.label}
          image={item.image}
          path={item.path}
          selected={selected}
          onSelected={setSelected}
          id={`menu_${index}`}
        />
      ))}
    </div>
  );
};

export default Navigation;
