import React, { useEffect, useState, useRef } from 'react';

import NavItem from 'Components/NavItem';

import { NAVIGATION_MENU } from '../../utils/constants';
import classes from './style.scss';

const Navigation = () => {
  const [selected, setSelected] = useState(null);
  const nav = useRef(null);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        nav.current.style.bottom = '2rem';
      } else {
        nav.current.style.bottom = '-10rem';
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <div className={classes.navigationWrapper} ref={nav}>
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
