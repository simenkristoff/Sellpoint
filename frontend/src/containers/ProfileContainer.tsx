import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId, IApplicationState } from '@/state/interface';
import { Profile } from '@/components/Profile';
import { fetchUserById, updateProfile, deleteUser } from '@/state/ducks/user/actions';
import { UserState } from '@/state/ducks/user/types';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '@/state/ducks/auth/actions';
import { clearUserProducts, fetchUserProducts } from '@/state/ducks/product/actions';
import { Breakpoints } from '@/components/ProductManager/interface';

interface IParams {
  userId: string;
}

const breakpoints: Breakpoints = {
  lg: 6,
  md: 8,
};

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams<IParams>();
  const [visible, setVisible] = useState<boolean>(false);
  const { isAdmin, user_id, isLoggedIn } = useSelector(({ auth }: IApplicationState) => auth);
  const { byId, loading }: UserState = useSelector(({ user }: IApplicationState) => user);
  const products = useSelector(({ product }: IApplicationState) => product.byUser);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && user_id !== null && user_id.toString() === userId) {
      setIsOwner(true);
    }
  }, []);

  const stateToProps = {
    userId,
    user_id,
    user: byId,
    products,
    breakpoints,
    loading,
    visible,
    isOwner,
  };

  const handleEdit = (values: any) => {
    dispatch(updateProfile(user_id, values));
    setVisible(false);
    dispatch(logout());
    history.push('/logg_inn');
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const handleDeleteUser = (values: any) => {
    dispatch(deleteUser(values));
    dispatch(logout());
    history.push('/');
  };

  const dispatchToProps = {
    fetchUserById: useCallback((userId: EntityId) => dispatch(fetchUserById(userId)), [dispatch]),
    fetchUserProducts: useCallback((userId: EntityId) => dispatch(fetchUserProducts(userId)), [dispatch]),
    clearUserProducts: useCallback(() => dispatch(clearUserProducts()), [dispatch]),
    handleEdit: useCallback((values: any) => handleEdit(values), [dispatch]),
    deleteUser: useCallback((values: any) => handleDeleteUser(values), [dispatch]),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  return <Profile {...stateToProps} {...dispatchToProps} />;
};
