import React from 'react';
import { Container } from './Container';
import { Card, Row, Col, Space } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ApiResponse, LoginCredentials } from '@/state/interface';
import { ErrorResponse } from './ErrorResponse';
import { Spinner } from './Spinner';

interface IProps {
  login: (credentials: LoginCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
}

/**
 * Login component. Displays a form which allows users to login.
 */
export const Login: React.FC<IProps> = ({ login, loading, response }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Container size='default'>
      <Row justify='center' align='middle' style={{ padding: '2rem' }}>
        <Col md={12} span={24}>
          <Card title='Logg inn'>
            <ErrorResponse response={response} />
            <Spinner loading={loading} />
            <Form form={form} onFinish={login} name='login_form' className='login-form' requiredMark={false}>
              <Form.Item name='username' rules={[{ required: true, message: 'Vennligst tast inn brukernavnet ditt!' }]}>
                <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Brukernavn' />
              </Form.Item>
              <Form.Item name='password' rules={[{ required: true, message: 'Vennligst tast inn passordet ditt!' }]}>
                <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Passord' />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space direction='horizontal'>
                  <Button type='primary' htmlType='submit' className='login-form-button'>
                    Logg inn
                  </Button>
                  <Link to='/register'>Registrer deg</Link>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
