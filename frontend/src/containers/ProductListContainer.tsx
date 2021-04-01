import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity, ProductState } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { createProduct, deleteProduct, fetchProducts } from '@/state/ducks/product/actions';
import { Breakpoints, ProductList } from '@/components/ProductList';
import { useWindowSize } from '@/hooks';

export const ProductListContainer = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [breakpointIndex, setBreakpointIndex] = useState<number>(2);
  const [visible, setVisible] = useState<boolean>(false);
  const { data, loading }: ProductState = useSelector(({ product }: IApplicationState) => product);
  const { isAdmin, isLoggedIn } = useSelector(({ auth }: IApplicationState) => auth);

  const breakpoints: Breakpoints = {
    lg: 6,
    md: 8,
  };

  useEffect(() => {
    if (width >= 992) {
      // Breakpoint LG
      setBreakpointIndex((24 / breakpoints.lg) * 2 - 1);
    } else if (width >= 768) {
      // Breakpoint MD
      setBreakpointIndex((24 / breakpoints.md) * 2 - 1);
    } else {
      // Breakpoint SM
      setBreakpointIndex(2);
    }
  }, [width]);

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
    breakpoints,
    breakpointIndex,
  };

  // Map Redux Actions to component props
  const dispatchToProps = {
    fetchProducts: useCallback(() => dispatch(fetchProducts()), [dispatch]),
    deleteProduct: useCallback((data: ProductEntity) => dispatch(deleteProduct(data)), [dispatch]),
    handleCreate: useCallback((values: any) => handleCreate(values), []),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  return <ProductList {...stateToProps} {...dispatchToProps} />;
};
