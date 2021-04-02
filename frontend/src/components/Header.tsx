import React from 'react';
import logo from '@/assets/img/logo.png';
import { Nav } from '@/components/Navigation';
import { LoginOutlined, UserAddOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { fetchUserById } from '@/state/ducks/user/actions';
import { EntityId } from '@/state/interface';

interface IProps {
  username: string | null;
  isLoggedIn: boolean;
  userId: EntityId | null;
  logout: () => void;
}

/**
 * Header component. Displays the navigation bar and site logo.
 */
export const Header: React.FC<IProps> = ({ username, isLoggedIn,userId , logout }: IProps) => {
  return (
    <header className='site-header'>
      <Nav logo={logo}>
        <Nav.List align='right'>
          <Nav.Item to='/'>Hjem</Nav.Item>
          {isLoggedIn && [
            <Nav.Item icon={<UserOutlined />} key='user' to={`/minside/${userId}`} >
                {username}
            </Nav.Item>,
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
