import React, { useState, useRef } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { NavigationWrapper, NavigationInterface } from './interface';
import NavList from './NavList';
import NavItem from './NavItem';

/**
 * Navbar component. Displays a navigation bar with optional logo and navigation links.
 * The navigation bar responds to change in screen size, and will render a stacked
 * navigation bar when the screen size is less than 992px.
 *
 * @typedef {NavigationWrapper<NavigationInterface>} Props
 */
const Navbar: NavigationWrapper<NavigationInterface> = props => {
  const { id, toggler, logo, className }: NavigationInterface = props;
  const menuRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [toggled, setToggled] = useState(false);
  const classes: string[] = ['nav-menu', 'nav-menu-expand'];
  if (className) {
    className.split(' ').forEach(_c => {
      classes.push(_c);
    });
  }

  const handleToggle = () => {
    if (!toggled) menuRef.current.classList.add('show');
    else menuRef.current.classList.remove('show');
    setToggled(!toggled);
  };

  return (
    <nav className={classes.join(' ')} id={id}>
      {logo && (
        <Link to='/' className='nav-brand'>
          <img src={logo} alt={logo} />
        </Link>
      )}
      <button className='navigation-toggler' type='button' onClick={handleToggle}>
        {toggler}
      </button>
      <div ref={menuRef} className='nav-bar-wrapper'>
        <CSSTransition in={toggled} timeout={350} unmountOnExit={false} classNames='fade'>
          <div className='nav-bar'>{props.children}</div>
        </CSSTransition>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  id: 'main-navigation',
  toggler: <MenuOutlined />,
};

Navbar.List = NavList;
Navbar.Item = NavItem;

export default Navbar;
