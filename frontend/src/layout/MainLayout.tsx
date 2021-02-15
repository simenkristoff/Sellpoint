import React from 'react';
import { Layout } from 'antd';
import { Container } from '@/components/Container';
import { HeaderContainer } from '@/containers/HeaderContainer';
import { FooterContainer } from '@/containers/FooterContainer';

const { Content } = Layout;

/**
 * MainLayout. The main layout of the site.
 */
export const MainLayout: React.FC = props => {
  return (
    <div className='site-wrapper'>
      <HeaderContainer />
      <Container size='default' className='main-container'>
        <Layout>
          <Content className='main-content'>{props.children}</Content>
        </Layout>
      </Container>
      <FooterContainer />
    </div>
  );
};
