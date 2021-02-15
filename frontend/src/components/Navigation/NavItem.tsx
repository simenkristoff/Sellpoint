import React from 'react';
import { Link } from 'react-router-dom';

import { NavigationItemInterface } from './interface';

/**
 * NavItem component. Navigation link.
 * @typedef {NavigationItemInterface} Props
 */
const NavItem: React.FC<NavigationItemInterface> = props => {
  const { to, icon, className, onClick }: NavigationItemInterface = props;
  const classes: string[] = ['nav-item'];
  if (className) {
    className.split(' ').forEach(_c => {
      classes.push(_c);
    });
  }

  return (
    <li className={classes.join(' ')}>
      <Link className='nav-link' to={to!} onClick={onClick}>
        {icon}
        {props.children}
      </Link>
    </li>
  );
};

NavItem.defaultProps = {
  to: '',
};

export default NavItem;
