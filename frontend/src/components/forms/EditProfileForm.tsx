import React from 'react';
import { Form, FormInstance, Input } from 'antd';
import { UserEntity } from '@/state/ducks/user/types';

interface IProps {
  form: FormInstance<any>;
  initialValues?: UserEntity | {};
}

export const EditProfileForm: React.FC<IProps> = ({ form, initialValues }: IProps) => {
  return (
    <Form form={form} layout='vertical' name='product_form' className='product-form' requiredMark={false} initialValues={initialValues}>
      <Form.Item name='first_name' label='Fornavn'>
        <Input />
      </Form.Item>
      <Form.Item name='last_name' label='Etternavn'>
        <Input />
      </Form.Item>
      <Form.Item name='username' label='Brukernavn'>
        <Input />
      </Form.Item>
      <Form.Item name='email' label='E-mail'>
        <Input />
      </Form.Item>
    </Form>
  );
};
