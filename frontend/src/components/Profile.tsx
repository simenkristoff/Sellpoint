import React, { useEffect } from 'react';
import { Container } from './Container';
import { Col, Row, Button, Modal, Form, Divider, PageHeader, Descriptions, Result } from 'antd';
import { EntityId } from '@/state/interface';
import { UserEntity } from '@/state/ducks/user/types';
import { EditProfileForm } from './forms/EditProfileForm';
import { ProductEntity } from '@/state/ducks/product/types';
import { Breakpoints } from './ProductManager/interface';
import { ProductCard } from './ProductManager/ProductCard';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
  userId: string;
  user: UserEntity | {};
  products: ProductEntity[];
  user_id: EntityId | null;
  breakpoints: Breakpoints;
  visible: boolean;
  isOwner: boolean;
  fetchUserById: (userId: EntityId) => void;
  fetchUserProducts: (userId: EntityId) => void;
  clearUserProducts: () => void;
  handleEdit: (values: any) => void; //change from String to void
  openModal: () => void;
  closeModal: () => void;
  deleteUser: (user: UserEntity) => void;
}

export const Profile: React.FC<IProps> = ({
  userId,
  user_id,
  user,
  visible,
  isOwner,
  products,
  breakpoints,
  fetchUserById,
  fetchUserProducts,
  clearUserProducts,
  handleEdit,
  openModal,
  closeModal,
  deleteUser,
}: IProps) => {
  const [form] = Form.useForm();
  const { username, email, first_name, last_name } = user as UserEntity;

  useEffect(() => {
    fetchUserById(parseInt(userId));
    fetchUserProducts(parseInt(userId));

    return () => {
      clearUserProducts();
    };
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

  const handleDelete = () => {
    deleteUser(user as UserEntity);
  };

  const extras = () => {
    if (isOwner) {
      return [
        <Button key='edit' type='primary' onClick={openModal}>
          Rediger profil
        </Button>,
        <Button key='delete' danger onClick={handleDelete}>
          Slett bruker
        </Button>,
      ];
    }

    return [
      <a key='contact' className='c2a-contact' href={`mailto: ${email}`}>
        <Button type='primary'>Kontakt selger</Button>
      </a>,
    ];
  };

  const renderProducts = () => {
    if (products.length > 0) {
      return (
        <Row gutter={[16, 16]}>
          {products.length > 0 &&
            products.map(product => (
              <Col lg={breakpoints.lg} md={breakpoints.md} span={24} key={product.id}>
                <ProductCard product={product} isAdmin={false} observerID={user_id} />
              </Col>
            ))}
        </Row>
      );
    }

    return <Result icon={<ExclamationCircleOutlined />} title={`${username} har ikke lagt til noen produkter`} />;
  };

  const render = () => {
    if (user === undefined) {
      return null;
    }

    return (
      <Container className='profile-container' size='default'>
        <PageHeader ghost={false} title={`${username} sin profil`} extra={extras()}>
          <Descriptions size='small' column={2} style={{ paddingTop: '1rem' }}>
            <Descriptions.Item label='Brukernavn'>{username}</Descriptions.Item>
            <Descriptions.Item label='Navn'>{`${first_name} ${last_name}`}</Descriptions.Item>
            <Descriptions.Item label='Email'>{email}</Descriptions.Item>
          </Descriptions>
          <h4 style={{ marginTop: '1rem' }}>{`${username} sine produkter`}</h4>
          <Divider />
          {renderProducts()}
        </PageHeader>

        {renderModal()}
      </Container>
    );
  };

  return render();
};
