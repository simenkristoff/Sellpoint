import React from 'react';
import logo from '@/assets/img/logo.png';
import { Nav } from '@/components/Navigation';
import { LoginOutlined, UserAddOutlined, LogoutOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { WithAdvertAuth } from '@/hoc';

interface IProps {
  username: string | null;
  isLoggedIn: boolean;
  logout: () => void;
}

/**
 * Header component. Displays the navigation bar and site logo.
 */
export const Header: React.FC<IProps> = ({ username, isLoggedIn, logout }: IProps) => {
  return (
    <header className='site-header'>
      <Nav logo={logo}>
        <Nav.List align='right'>
          <Nav.Item to='/'>Hjem</Nav.Item>
          {isLoggedIn && [
            <Nav.Item to='/profile' icon={<UserOutlined />} key='user'>
              {username}
            </Nav.Item>,
            <WithAdvertAuth key='adverts'>
              <Nav.Item to='/mine_reklamer' icon={<AppstoreOutlined />}>
                Mine reklamer
              </Nav.Item>
            </WithAdvertAuth>,
            <Nav.Item icon={<LogoutOutlined />} onClick={() => logout()} key='logout'>
              Logg ut
            </Nav.Item>,
          ]}
          {!isLoggedIn && [
            <Nav.Item icon={<LoginOutlined />} to='/logg_inn' key='login'>
              Logg inn
            </Nav.Item>,
            <Nav.Item icon={<UserAddOutlined />} to='/registrer' key='register'>
              Registrer bruker
            </Nav.Item>,
          ]}
        </Nav.List>
      </Nav>
    </header>
  );
};
