import React from 'react';
import { Row, Col, Card } from 'antd';
import { Container } from './Container';
import { RegisterForm } from './forms';
import { ApiResponse, RegisterCredentials } from '@/state/interface';
import { ErrorResponse } from './ErrorResponse';
import { Spinner } from './Spinner';

interface IProps {
  register: (credentials: RegisterCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
}

/**
 * Register Component. Displays a form which allows users to register an account.
 */
export const Register: React.FC<IProps> = ({ register, loading, response }: IProps) => {
  return (
    <Container size='default'>
      <Row justify='center' align='middle' style={{ padding: '2rem' }}>
        <Col md={12} span={24}>
          <Card title='Registrer deg'>
            <ErrorResponse response={response} />
            <Spinner loading={loading} />
            <RegisterForm register={register}/>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
