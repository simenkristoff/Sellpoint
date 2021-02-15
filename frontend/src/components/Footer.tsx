import React from 'react';
import { Layout, Row } from 'antd';
import { Container } from '@/components/Container';

/**
 * Footer component. Displays the site footer, i.e. the component at the very bottom of the page.
 */
export const Footer: React.FC = () => {
  return (
    <Layout.Footer className='site-footer'>
      <Container size='default'>
        <Row align='top'></Row>
      </Container>
    </Layout.Footer>
  );
};
