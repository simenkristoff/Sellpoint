import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity, ProductState } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { createProduct, deleteProduct, fetchProducts } from '@/state/ducks/product/actions';
import { ProductList } from '@/components/ProductList';
import { ProductFilter } from '@/components/ProductFilter';

export const ProductListContainer = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const { data, loading }: ProductState = useSelector(({ product }: IApplicationState) => product);
  const { isAdmin, isLoggedIn } = useSelector(({ auth }: IApplicationState) => auth);

  const handleCreate = (values: any) => {
    dispatch(createProduct(values));
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  // Map Redux State to component props
  const stateToProps = {
    products: data,
    loading,
    isAdmin,
    isLoggedIn,
    visible,
  };

  // Map Redux Actions to component props
  const dispatchToProps = {
    fetchProducts: useCallback(() => dispatch(fetchProducts()), [dispatch]),
    deleteProduct: useCallback((data: ProductEntity) => dispatch(deleteProduct(data)), [dispatch]),
    handleCreate: useCallback((values: any) => handleCreate(values), []),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  return <div>
    <ProductFilter />
    <ProductList {...stateToProps} {...dispatchToProps} />
    </div>;
};
