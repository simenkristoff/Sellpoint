
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { ProductEntity } from '@/state/ducks/product/types';

import { Container } from './Container';
import { Col, Row, Button, Modal, Form, List, Divider, Typography } from 'antd';
import { Spinner } from './Spinner';
import { EntityId } from '@/state/interface';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { ProductForm } from './forms/ProductForm';
import { UserEntity } from '@/state/ducks/user/types';
import { deleteUser, fetchUserById } from '@/state/ducks/user/actions';
import { DeleteButton } from './DeleteButton';




interface IProps {
  user: UserEntity | {};
  loading: boolean;
  isAdmin: boolean;
  user_id: EntityId | null;
  visible: boolean;
  fetchUserById: (userId: string) => void;
  handleEdit: (values: any) => void;
  openModal: () => void;
  closeModal: () => void;
  deleteUser: (user: UserEntity) => void;
}

interface IParams {
  userId: string;
}


export const Profile: React.FC<IProps> = ( 

{
  user,
  loading,
  user_id,
  visible,
  fetchUserById,
  deleteUser,
  handleEdit,
  openModal,
  closeModal,
}: IProps ) => {
  const [form] = Form.useForm();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { userId } = useParams<IParams>();

  useEffect(() => {
    fetchUserById(userId);
    
  }, []);

  const data = [
    `Fornavn: ${ user && (user as UserEntity).first_name! }`,
    `Etternavn: ${ user && (user as UserEntity).last_name! }`,
    `Email-adresse: ${ user && (user as UserEntity).email! }`,
  ];


  if (user === undefined) {return null} 
  
  const render = () => {
    return (
      <Container size='default' >
        <Row justify='center' align='middle' style={{ padding: '2rem' }}>
          <Col md={12} span={24}>
            <Divider orientation="left">{ user && (user as UserEntity).username! }</Divider>
            <List
              
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <DeleteButton onClick={() => deleteUser(user as UserEntity)} />
          </Col>
        </Row>
      </Container>
    );
  };

  return render();
};
