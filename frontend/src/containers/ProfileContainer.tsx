import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/state/interface';
import { Profile } from '@/components/Profile';
import { fetchUserById, updateProfile, deleteUser } from '@/state/ducks/user/actions';
import { UserState } from '@/state/ducks/user/types';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '@/state/ducks/auth/actions';

interface IParams {
  userId: string;
}

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams<IParams>();
  const [visible, setVisible] = useState<boolean>(false);
  const { isAdmin, user_id, isLoggedIn } = useSelector(({ auth }: IApplicationState) => auth);
  const { byId, loading }: UserState = useSelector(({ user }: IApplicationState) => user);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    console.log(user_id);
    if (isLoggedIn && user_id !== null && user_id.toString() === userId) {
      setIsOwner(true);
    }
  }, []);

  const stateToProps = {
    user: byId,
    loading,
    isAdmin,
    user_id,
    visible,
    isOwner,
  };

  const handleEdit = (values: any) => {
    console.log(values);
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

  const deleteUser1 = (values: any) => {
    console.log('Hei');
    dispatch(deleteUser(values));
    dispatch(logout());
    history.push('/');
  };

  const dispatchToProps = {
    fetchUserById: useCallback((userId: string) => dispatch(fetchUserById(userId)), [dispatch]),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
    handleEdit: useCallback((values: any) => handleEdit(values), []),
    deleteUser: useCallback((values: any) => deleteUser1(values), [dispatch]),
  };

  return <Profile {...stateToProps} {...dispatchToProps} />;
};
