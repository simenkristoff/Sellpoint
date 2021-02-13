import React from 'react'
import {Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'


export const Header: React.FC = () => {
    return (
        <Layout.Header className='site-header'>
            <Menu mode='horizontal' className='main-nav'>
                <Menu.Item>
                    <Link to='/'>Hjem</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/register'>Register</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/login'>Logg inn</Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    )
}