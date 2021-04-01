import React from 'react';
import { Form, Input, Slider } from 'antd';
import { IApplicationState } from '@/state/interface';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUpload } from '../ImageUpload';
import { createAdvert } from '@/state/ducks/advert/actions';
import { FormMessage, ADVERT_PRICE } from '@/constants';
import { DataFormInterface } from './interface';
import { AdvertEntity } from '@/state/ducks/advert/types';
import { InfoCircleOutlined, LinkOutlined } from '@ant-design/icons';

export const AdvertForm: React.FC<DataFormInterface<AdvertEntity>> = ({ data, form, editMode }: DataFormInterface<AdvertEntity>) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }: IApplicationState) => auth.user_id);
  const handleSubmit = (values: any) => {
    dispatch(createAdvert(values));
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ ...data, user }}
      name='advert_form'
      className='advert-form'
      onFinish={handleSubmit}
      requiredMark={false}
    >
      <Form.Item shouldUpdate>
        {() => {
          const duration = form.getFieldValue(['duration']);
          const total_price = duration > 0 ? ADVERT_PRICE * duration : ADVERT_PRICE;

          return <h3>Totalpris: {total_price}</h3>;
        }}
      </Form.Item>
      <Form.Item name='id' hidden>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item name='user' hidden>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item
        name={['title']}
        label={FormMessage.ADVERT_TITLE.LABEL}
        rules={[{ required: true, message: FormMessage.ADVERT_TITLE.REQUIRED }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['link']}
        label={FormMessage.ADVERT_LINK.LABEL}
        rules={[{ required: true, message: FormMessage.ADVERT_LINK.REQUIRED }]}
        tooltip={{
          title: FormMessage.ADVERT_LINK.INFO,
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input prefix={<LinkOutlined />} type='url' />
      </Form.Item>
      <Form.Item
        name='duration'
        label={FormMessage.ADVERT_DURATION.LABEL}
        tooltip={{
          title: FormMessage.ADVERT_DURATION.INFO,
          icon: <InfoCircleOutlined />,
        }}
      >
        <Slider
          disabled={editMode}
          min={1}
          max={5}
          marks={{
            1: '1 uke',
            2: '2 uker',
            3: '3 uker',
            4: '4 uker',
            5: '5 uker',
          }}
        />
      </Form.Item>

      <Form.Item
        name='images'
        label={FormMessage.ADVERT_IMAGE.LABEL}
        rules={[{ required: !editMode, message: FormMessage.ADVERT_IMAGE.REQUIRED }]}
      >
        <ImageUpload allowMultiple={false} allowCrop />
      </Form.Item>
    </Form>
  );
};

export default AdvertForm;
