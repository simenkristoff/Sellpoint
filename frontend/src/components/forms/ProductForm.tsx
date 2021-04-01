import React from 'react';
import { Form, FormInstance, Input, InputNumber } from 'antd';
import { ProductEntity } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { useSelector } from 'react-redux';
import { ImageUpload } from '../ImageUpload';
import { FormMessage } from '@/constants';

interface IProps {
  form: FormInstance<any>;
  initialValues?: ProductEntity;
}

export const ProductForm: React.FC<IProps> = ({ form, initialValues }: IProps) => {
  const owner = useSelector(({ auth }: IApplicationState) => auth.user_id);

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ ...initialValues, owner }}
      name='product_form'
      className='product-form'
      requiredMark={false}
    >
      <Form.Item name='id' hidden>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item name='owner' hidden>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item name='title' label='Overskrift' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='description' label='Produktbeskrivelse' initialValue={null}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name='price' label='Pris (NOK)' rules={[{ required: true, type: 'number' }]}>
        <InputNumber />
      </Form.Item>

      <Form.Item
        name='images'
        label={FormMessage.PRODUCT_IMAGE.LABEL}
        rules={[{ required: initialValues === undefined, message: FormMessage.PRODUCT_IMAGE.REQUIRED }]}
      >
        <ImageUpload />
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
