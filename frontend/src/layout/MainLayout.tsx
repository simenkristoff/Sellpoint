import React from 'react';
import { Layout } from 'antd';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { FooterContainer } from '@/containers/FooterContainer';

const { Content } = Layout;

/**
 * MainLayout. The main layout of the site.
 */
export const MainLayout: React.FC = props => {
  return (
    <div className='site-wrapper'>
      <Header />
      <Container size='default' className='main-container'>
        <Layout>
          <Content className='main-content'>{props.children}</Content>
        </Layout>
      </Container>
      <FooterContainer />
    </div>
  );
};
