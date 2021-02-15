import React from 'react';

import { NavigationListInterface } from './interface';

/**
 * NavList component. Wrapper for navigation links.
 * @typedef {NavigationListInterface} Props
 */
const NavList: React.FC<NavigationListInterface> = props => {
  const { align, className }: NavigationListInterface = props;
  const classes: string[] = ['nav-list'];
  if (align) classes.push(align);
  if (className) {
    className.split(' ').forEach(_c => {
      classes.push(_c);
    });
  }

  return <ul className={classes.join(' ')}>{props.children}</ul>;
};

NavList.defaultProps = {
  align: 'left',
};

export default NavList;
