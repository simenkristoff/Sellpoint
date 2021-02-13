import React from 'react'
import {Layout} from 'antd'
import {Header} from '../components/Header'

const {Content} = Layout

export const MainLayout: React.FC = (props) => {
    return (
        <Layout><Header /><Content className='main-content'>{props.children}</Content></Layout>
    )
}