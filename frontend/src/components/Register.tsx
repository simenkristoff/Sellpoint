import React from 'react';
import { Row, Col, Card } from 'antd';
import { Container } from './Container';
import { RegisterForm } from './forms';

/**
 * Register Component. Displays a form which allows users to register an account.
 */
export const Register: React.FC = () => {
  return (
    <Container size='default'>
      <Row justify='center' align='middle' style={{ padding: '2rem' }}>
        <Col md={12} span={24}>
          <Card title='Registrer deg'>
            <RegisterForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
