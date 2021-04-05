import React, { useEffect } from 'react';
import _ from 'lodash';

import { useParams } from 'react-router-dom';

import { Container } from './Container';
import { Col, Row, Button, Modal, Form, List, Divider } from 'antd';
import { EntityId } from '@/state/interface';
import { UserEntity } from '@/state/ducks/user/types';

import { DeleteButton } from './DeleteButton';
import { EditProfileForm } from './forms/EditProfileForm';
import { useDispatch } from 'react-redux';

interface IProps {
  user: UserEntity | {};
  loading: boolean;
  isAdmin: boolean;
  user_id: EntityId | null;
  visible: boolean;
  isOwner: boolean;
  fetchUserById: (userId: string) => void;
  handleEdit: (values: any) => void; //change from String to void
  openModal: () => void;
  closeModal: () => void;
  deleteUser: (user: UserEntity) => void;
}

interface IParams {
  userId: string;
}

export const Profile: React.FC<IProps> = ({
  user,
  visible,
  isOwner,
  fetchUserById,
  handleEdit,
  openModal,
  closeModal,
  deleteUser,
}: IProps) => {
  const [form] = Form.useForm();
  const { userId } = useParams<IParams>();

  useEffect(() => {
    fetchUserById(userId);
  }, []);

  const renderModal = () => (
    <Modal
      title={`Rediger profil`}
      okText='Lagre endringer'
      visible={visible}
      afterClose={() => {
        form.resetFields();
      }}
      onCancel={() => {
        form.resetFields();
        closeModal();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            form.resetFields();
            handleEdit(values);
          })
          .catch((info: any) => {
            console.warn('Validation failed: ', info);
          });
      }}
    >
      <EditProfileForm initialValues={user} form={form} />
    </Modal>
  );

  const data = [
    `Fornavn: ${user && (user as UserEntity).first_name!}`,
    `Etternavn: ${user && (user as UserEntity).last_name!}`,
    `Email-adresse: ${user && (user as UserEntity).email!}`,
  ];

  if (user === undefined) {
    return null;
  }

  const deleteUserAndLogOut = () => {
    deleteUser(user as UserEntity);
  };

  const render = () => {
    return (
      <Container className='profile-container' size='default'>
        <Row justify='center' align='middle' style={{ padding: '2rem' }} className='userProfile'>
          <Col md={12} span={24}>
            <Divider className='user-name' orientation='left'>
              {user && (user as UserEntity).username!}
            </Divider>
            <List bordered dataSource={data} renderItem={item => <List.Item>{item}</List.Item>} />
            {renderModal()}
            <div className='buttons'>
              {isOwner && (
                <Button className='edit-profile' type='primary' size='large' ghost onClick={openModal}>
                  Rediger profil
                </Button>
              )}
              <div className='delete-button'>{isOwner && <DeleteButton onClick={deleteUserAndLogOut} />}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  return render();
};
