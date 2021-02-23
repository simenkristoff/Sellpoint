import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload, Card, Row, Col, message } from 'antd';
import { Container } from '../Container';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} er påkrevd!',
};

export const ProductListingCreate: React.FC = () => {
  const [image, setImage] = useState<any>();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files  !== null && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const onFinish = (values: any) => {
    console.log(values.image);
    const formData = new FormData();
    console.log(image);
    formData.append('image', image, image.name);
    formData.append('owner', '1');
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    console.log(formData.entries);
    console.log(values);
    console.log({ ...values.user, owner: 1, image: image });
    fetch(`http://localhost:8000/product/products/`, {
      method: 'POST',
      redirect: 'follow',
      body: formData,
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Container size='default'>
      <Row justify='center' align='middle' style={{ padding: '2rem' }}>
        <Col md={18} span={24}>
          <Card title='Opprett annonse'>
            <Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item name={['title']} label='Overskrift' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['description']} label='Produktbeskrivelse' initialValue={null}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name={['price']} label='Pris (NOK)' rules={[{ required: true, type: 'number' }]}>
                <InputNumber />
              </Form.Item>

              {/* Insert categories option here */}
              {/* <Form.Item name={['user', 'category']} label="Category">
                <Select >
                  {categories.map(() => (
                    osv...
                  ))}
                </Select>
              </Form.Item> */}

              <Form.Item name={['image']} label='Image'>
                <Input type='file' onChange={handleUpload}></Input>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type='primary' htmlType='submit'>
                  Opprett annonse
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
