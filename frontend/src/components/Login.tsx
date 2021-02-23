import React from 'react';
import { Container } from './Container';
import { Card, Row, Col } from 'antd';
import { ApiResponse, LoginCredentials } from '@/state/interface';
import { ErrorResponse } from './ErrorResponse';
import { Spinner } from './Spinner';
import { LoginForm } from './forms';

interface IProps {
  login: (credentials: LoginCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
}

/**
 * Login component. Displays a form which allows users to login.
 */
export const Login: React.FC<IProps> = ({ login, loading, response }: IProps) => {
  return (
    <Container size='default'>
      <Row justify='center' align='middle' style={{ padding: '2rem' }}>
        <Col md={12} span={24}>
          <Card title='Logg inn'>
            <ErrorResponse response={response} />
            <Spinner loading={loading} />
            <LoginForm login={login} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
