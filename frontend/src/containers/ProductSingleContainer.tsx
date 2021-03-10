import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity, ProductState } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { deleteProduct, fetchProductById, updateProduct } from '@/state/ducks/product/actions';
import { ProductSingle } from '@/components/ProductSingle';

export const ProductSingleContainer = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const { isAdmin, user_id } = useSelector(({ auth }: IApplicationState) => auth);
  const { byId, loading }: ProductState = useSelector(({ product }: IApplicationState) => product);

  // Map Redux State to component props
  const stateToProps = {
    product: byId,
    loading,
    isAdmin,
    user_id,
    visible,
  };

  const handleEdit = (values: any) => {
    dispatch(updateProduct(values));
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  // Map Redux Actions to component props
  const dispatchToProps = {
    fetchProductById: useCallback((productId: string) => dispatch(fetchProductById(productId)), [dispatch]),
    handleEdit: useCallback((values: any) => handleEdit(values), []),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  return <ProductSingle {...stateToProps} {...dispatchToProps} />;
};
