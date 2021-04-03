import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { ProductEntity } from '@/state/ducks/product/types';

import { Container } from './Container';
import { Carousel, Col, Row, Button, Modal, Form } from 'antd';
import { Spinner } from './Spinner';
import { EntityId } from '@/state/interface';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { ProductForm } from './forms/ProductForm';
import { Advert } from './Advert';
import { pickRandomAd } from '@/utils';
import { AdsContext } from '@/context';
import { ProductGallery } from './ProductGallery';

interface IProps {
  product: ProductEntity | {};
  loading: boolean;
  isAdmin: boolean;
  user_id: EntityId | null;
  visible: boolean;
  fetchProductById: (productId: string) => void;
  handleEdit: (values: any) => void;
  openModal: () => void;
  closeModal: () => void;
}

interface IParams {
  productId: string;
}

export const ProductSingle: React.FC<IProps> = ({
  product,
  loading,
  user_id,
  visible,
  fetchProductById,
  handleEdit,
  openModal,
  closeModal,
}: IProps) => {
  const ads = useContext(AdsContext);
  const [form] = Form.useForm();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { productId } = useParams<IParams>();
  const { title, price, description, has_been_sold, category, owner, owner_details, upload_date, images } = product as ProductEntity;

  useEffect(() => {
    fetchProductById(productId);
    if (owner && user_id) {
      setIsOwner(user_id === owner);
    }
  }, []);

  useEffect(() => {
    setIsOwner(user_id === owner);
  }, [product]);

  const renderModal = () => (
    <Modal
      title={`Rediger annonse`}
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
      <ProductForm form={form} initialValues={product as ProductEntity} />
    </Modal>
  );

  const render = () => {
    if (loading || _.isEmpty(product)) {
      return <Spinner loading centered />;
    }

    return (
      <Container size='default' className='product-single'>
        <Row justify='space-between'>
          <Col md={16} span={24} className='product-main'>
            <ProductGallery images={images} />
            <section className='product-details'>
              <header className='header'>
                <div className='header-sub'>
                  <span>Lagt til {moment(upload_date).format('ll')}</span>
                  <a href={`tel: `}>
                    <PhoneOutlined />
                  </a>
                  <a href={`tel: ${owner_details.email}`}>
                    <MailOutlined />
                  </a>
                </div>
                <h1 className='product-title'>{title}</h1>
                <h2 className='price'>{`${price} kr`}</h2>
              </header>

              <div className='description' dangerouslySetInnerHTML={{ __html: description ? description : '' }} />
            </section>
          </Col>
          <Col className='product-sidebar' md={8} span={24}>
            <div className='sidebar-inner'>
              {isOwner && (
                <Button type='primary' size='large' ghost onClick={openModal}>
                  Rediger annonse
                </Button>
              )}
              <div className='seller-card'>
                <div className='avatar'>
                  <UserOutlined />
                </div>
                <div className='details'>
                  <span className='name'>
                    {owner_details.first_name} {owner_details.last_name}
                  </span>
                  <a className='username' href='/'>
                    @{owner_details.username}
                  </a>
                </div>
              </div>
              <a className='c2a-contact' href={`mailto: ${owner_details.email}`}>
                <Button type='primary' size='large'>
                  Kontakt selger
                </Button>
              </a>
            </div>
          </Col>
          <Advert style={{ paddingTop: '1rem' }} ad={pickRandomAd(ads)} size='large' hasShadow={false} />
          {!_.isEmpty(product) && renderModal()}
        </Row>
      </Container>
    );
  };

  return render();
};
