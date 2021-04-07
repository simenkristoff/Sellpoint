import React, { useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'antd';

import { Container } from '@/components/Container';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/Spinner';
import { ProductForm } from '@/components/forms';
import { Advert } from '@/components/Advert';
import { pickRandomAd } from '@/utils';
import { AdsContext } from '@/context';
import { ProductListInterface } from './interface';

export const ProductList: React.FC<ProductListInterface> = ({
  products,
  loading,
  isAdmin,
  isLoggedIn,
  userId,
  visible,
  breakpoints,
  breakpointIndex,
  fetchProducts,
  deleteProduct,
  handleCreate,
  openModal,
  closeModal,
}: ProductListInterface) => {
  const ads = useContext(AdsContext);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchProducts();
  }, []);

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
          {<h1 className='title'>Produkter</h1>}
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
                <ProductCard product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} observerID={userId} />
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
