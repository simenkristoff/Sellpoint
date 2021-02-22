import React from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, Card, Row, Col } from 'antd';
import { Container } from '../Container';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} er påkrevd!',
};

export const ProductListingCreate: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(JSON.stringify({ ...values.user, owner: 1 }));
    fetch(`http://localhost:8000/product/products/`, {
      method: 'POST',
      body: JSON.stringify({ ...values.user, owner: 1 }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Container size='default'>
      <Row justify='center' align='middle' style={{ padding: '2rem' }}>
        <Col md={12} span={24}>
          <Card title='Opprett annonse'>
            <Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item name={['user', 'title']} label='Overskrift' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['user', 'description']} label='Produktbeskrivelse' initialValue={null}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name={['user', 'price']} label='Pris (NOK)' rules={[{ required: true, type: 'number' }]}>
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

              {/* <Form.Item name={['user', 'image']} label="Image">
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item> */}

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
