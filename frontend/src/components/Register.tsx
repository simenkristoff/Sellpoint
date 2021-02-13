import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Row, Col, Card, Form, Input, Space, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from './Container'


export const Register: React.FC = () => {
    return (
        <Container size='default'>
      <Row justify='center' align='middle' style={{padding:'2rem'}}>
        <Col md={12} span={24}>
        <Card title='Registrer deg'>
        <Form name='normal_register' className='register-form' initialValues={{ remember: true }}>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item name='epost' rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Epost' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item name='confirm-password' hasFeedback dependencies={['password']} rules={[{ required: true, message: 'Please input your Password!' }, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          })]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Bekreft passord' />
          </Form.Item>
          <Form.Item style={{textAlign: 'center'}}>
            <Space direction='horizontal' >
            <Button type='primary' htmlType='submit' className='register-form-button'>
              Registrer deg
            </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
        </Col>
      </Row>
      
    </Container>
    )
}