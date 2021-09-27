import React from 'react';
import PropTypes from 'prop-types';

import history from '../../utils/history';
import classes from './style.scss';

const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string,
  selected: PropTypes.string,
  onSelected: PropTypes.func,
};

const NavItem = ({ id, label, image, path, selected, onSelected }) => {
  const handleSelect = () => {
    onSelected(id);
  };

  const handleDeselect = () => {
    onSelected(null);
  };

  const navigateTo = () => {
    history.push(path);
  };

  return (
    <div
      className={`${classes.itemWrapper} ${
        selected === id || path === window.location.pathname ? classes.selected : ''
      }`}
      onMouseEnter={handleSelect}
      onMouseLeave={handleDeselect}
      onClick={navigateTo}
    >
      <img src={image} alt={label} />
    </div>
  );
};

NavItem.propTypes = propTypes;

export default NavItem;
