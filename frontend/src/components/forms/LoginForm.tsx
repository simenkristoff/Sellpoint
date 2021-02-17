import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Space, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginCredentials } from '@/state/interface';
import { FormMessage } from '@/constants';

interface IProps {
  /** Login action */
  login: (credentials: LoginCredentials) => void;
}

/**
 * Login form used to login users
 */
const LoginForm: React.FC<IProps> = ({ login }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={login} name='login_form' className='login-form' requiredMark={false}>
      <Form.Item name='username' rules={[{ required: true, message: FormMessage.USERNAME.REQUIRED }]}>
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder={FormMessage.USERNAME.LABEL} />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: FormMessage.PASSWORD.REQUIRED }]}>
        <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder={FormMessage.PASSWORD.LABEL} />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Space direction='horizontal'>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Logg inn
          </Button>
          <Link to='/registrer'>Registrer deg</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
