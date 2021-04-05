import React from 'react';
import { Button, Form, FormInstance, Input, Space } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { FormMessage } from '@/constants';
import { IApplicationState, RegisterCredentials } from '@/state/interface';
import { UserEntity } from '@/state/ducks/user/types';
import { useSelector } from 'react-redux';
import { profile } from 'console';

interface IProps {
  form: FormInstance<any>;
  initialValues?: UserEntity;
}

/**
 * Registration form used to register new users.
 */
const ProfileForm: React.FC<IProps> = ({ form, initialValues }: IProps) => {
    const owner = useSelector(({ auth }: IApplicationState) => auth.user_id);

  return (
    <Form form={form} onFinish={profile} name='register_form' className='register-form' requiredMark={false}>
      <Form.Item name='username' rules={[{ required: true, message: FormMessage.USERNAME.REQUIRED }]}>
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder={FormMessage.USERNAME.LABEL} />
      </Form.Item>
      <Form.Item name='email' rules={[{ required: true, message: FormMessage.EMAIL.REQUIRED }]}>
        <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder={FormMessage.EMAIL.LABEL} />
      </Form.Item>
      <Form.Item name='first_name' rules={[{ required: true, message: FormMessage.FIRST_NAME.REQUIRED }]}>
        <Input placeholder={FormMessage.FIRST_NAME.LABEL} />
      </Form.Item>
      <Form.Item name='last_name' rules={[{ required: true, message: FormMessage.LAST_NAME.REQUIRED }]}>
        <Input placeholder={FormMessage.LAST_NAME.LABEL} />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: FormMessage.PASSWORD.REQUIRED },
          { min: 8, message: FormMessage.PASSWORD.LENGTH },
        ]}
      >
        <Input.Password type='password' placeholder={FormMessage.PASSWORD.LABEL} />
      </Form.Item>
      <Form.Item
        name='password2'
        hasFeedback
        dependencies={['password']}
        rules={[
          { required: true, message: FormMessage.CONFIRM_PASSWORD.REQUIRED },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(FormMessage.CONFIRM_PASSWORD.ERROR);
            },
          }),
        ]}
      >
        <Input.Password type='password' placeholder={FormMessage.CONFIRM_PASSWORD.LABEL} />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Space direction='horizontal'>
          <Button type='primary' htmlType='submit' className='register-form-button'>
            Registrer deg
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
