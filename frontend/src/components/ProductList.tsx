import React, { useEffect, useState } from 'react';
import { ProductEntity } from '@/state/ducks/product/types';
import { Button, Col, Form, Modal, Row } from 'antd';

import { Container } from './Container';
import { ProductCard } from './ProductCard';
import { Spinner } from './Spinner';
import { ProductForm } from './forms/ProductForm';

interface IProps {
  products: ProductEntity[];
  loading: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  visible: boolean;
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
  visible,
  fetchProducts,
  deleteProduct,
  handleCreate,
  openModal,
  closeModal,
}: IProps) => {
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
          {isLoggedIn && (
            <Button type='primary' ghost onClick={openModal}>
              Legg til ny annonse
            </Button>
          )}
        </div>
        <Row gutter={[16, 16]}>
          {products.length > 0 &&
            products.map(product => (
              <Col lg={6} md={8} span={24} key={product.id}>
                <ProductCard product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} />
              </Col>
            ))}
        </Row>
        {renderModal()}
      </Container>
    );
  };

  return render();
};