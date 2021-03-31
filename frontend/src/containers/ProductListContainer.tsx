import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity, ProductState } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { createProduct, deleteProduct, fetchFavouritesByUserId, fetchProducts } from '@/state/ducks/product/actions';
import { ProductList } from '@/components/ProductList';

interface IProps {
  favourites: boolean;
}

export const ProductListContainer: React.FC<IProps> = ({ favourites }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const { data, loading }: ProductState = useSelector(({ product }: IApplicationState) => product);
  const { isAdmin, isLoggedIn, user_id } = useSelector(({ auth }: IApplicationState) => auth);
  const fetchFunction = (favourites && isLoggedIn) ? fetchFavouritesByUserId(user_id!!) : fetchProducts();
  

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
    user_id,
    visible,
    favourites
  };

  // Map Redux Actions to component props
  const dispatchToProps = {
    // fetchProducts: useCallback(() => dispatch(fetchProducts()), [dispatch]),
    // fetchProducts: useCallback(() => dispatch(fetchFavouritesByUserId(1)), [dispatch]),
    fetchProducts: useCallback(() => dispatch(fetchFunction), [dispatch]),
    deleteProduct: useCallback((data: ProductEntity) => dispatch(deleteProduct(data)), [dispatch]),
    handleCreate: useCallback((values: any) => handleCreate(values), []),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  return <ProductList {...stateToProps} {...dispatchToProps} />;
};
