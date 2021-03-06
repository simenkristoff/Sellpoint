import React, { useEffect } from 'react';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { ProductEntity } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/state/ducks/category/actions';
import { ImageUpload } from '../ImageUpload';
import { FormMessage, locations } from '@/constants';

interface IProps {
  form: FormInstance<any>;
  initialValues?: ProductEntity;
}

export const ProductForm: React.FC<IProps> = ({ form, initialValues }: IProps) => {
  const dispatch = useDispatch();
  const owner = useSelector(({ auth }: IApplicationState) => auth.user_id);
  const categories = useSelector(({ category }: IApplicationState) => category.data);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
      <Form.Item name='category' label='Kategori'>
        <Select>
          {categories.map(category => (
            <Select.Option value={category.id} key={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='location' label='Sted'>
        <Select showSearch>
          {locations.map(location => (
            <Select.Option value={location} key={location}>
              {location}
            </Select.Option>
          ))}
        </Select>
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
