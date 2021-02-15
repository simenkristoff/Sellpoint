import React from 'react';
import logo from '@/assets/img/logo.png';

import { Nav } from '@/components/Navigation';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

/**
 * Header component. Displays the navigation bar and site logo.
 */
export const Header: React.FC = () => {
  return (
    <header className='site-header'>
      <Nav logo={logo}>
        <Nav.List align='right'>
          <Nav.Item to='/'>Hjem</Nav.Item>
          <Nav.Item icon={<LoginOutlined />} to='/logg_inn'>
            Logg inn
          </Nav.Item>
          <Nav.Item icon={<UserAddOutlined />} to='/registrer'>
            Registrer bruker
          </Nav.Item>
        </Nav.List>
      </Nav>
    </header>
  );
};
