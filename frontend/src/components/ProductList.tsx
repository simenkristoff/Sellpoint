import React, { useContext, useEffect } from 'react';
import { ProductEntity } from '@/state/ducks/product/types';
import { Button, Col, Form, Modal, Row } from 'antd';

import { Container } from './Container';
import { ProductCard } from './ProductCard';
import { Spinner } from './Spinner';
import { ProductForm } from './forms';
import { Advert } from './Advert';
import { pickRandomAd } from '@/utils';
import { AdsContext } from '@/context';

export type Breakpoints = {
  lg: number;
  md: number;
};

interface IProps {
  products: ProductEntity[];
  loading: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  user_id: number | null;
  visible: boolean;
  favourites: boolean;
  breakpoints: Breakpoints;
  breakpointIndex: number;
  fetchProducts: () => void;
  deleteProduct: (product: ProductEntity) => void;
  handleCreate: (values: any) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const ProductList: React.FC<IProps> = ({
  products,
  loading,
  isAdmin,
  isLoggedIn,
  user_id,
  visible,
  favourites,
  breakpoints,
  breakpointIndex,
  fetchProducts,
  deleteProduct,
  handleCreate,
  openModal,
  closeModal,
}: IProps) => {
  const ads = useContext(AdsContext);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchProducts();
  }, [favourites]);

  // Render Modal
  const renderModal = () => (
    <Modal
      title={`Legg til annonse`}
      okText='Opprett ny annonse'
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
          .then(values => {
            form.resetFields();
            handleCreate(values);
          })
          .catch(info => {
            console.warn('Validation failed: ', info);
          });
      }}
    >
      <ProductForm form={form} />
    </Modal>
  );

  // Handle render logic
  const render = () => {
    if (loading) {
      return <Spinner loading centered />;
    }

    return (
      <Container size='default' className='product-list'>
        <div className='header'>
          {favourites && <h1 className='title'>Favoritter</h1>}
          {isLoggedIn && (
            <Button className='create' type='primary' ghost onClick={openModal}>
              Legg til ny annonse
            </Button>
          )}
        </div>

        <Row gutter={[16, 16]}>
          {products.length > 0 &&
            products.map((product, index) => [
              <Col lg={breakpoints.lg} md={breakpoints.md} span={24} key={product.id}>
                <ProductCard product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} observerID={user_id} />
              </Col>,
              index > 0 && index % breakpointIndex === 0 && (
                <Advert key={`ad-${index}`} ad={pickRandomAd(ads)} style={{ padding: '0 8px' }} />
              ),
            ])}
        </Row>
        {renderModal()}
      </Container>
    );
  };

  return render();
};
