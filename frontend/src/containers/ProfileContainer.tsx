import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/state/interface';
import { Profile } from '@/components/Profile';
import { fetchUserById, updateProfile, deleteUser } from '@/state/ducks/user/actions';
import { UserEntity, UserState } from '@/state/ducks/user/types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';



interface IParams {
    userId: string;
  }

export const ProfileContainer = () => {

    const dispatch = useDispatch();
    const { userId } = useParams<IParams>();
    const [visible, setVisible] = useState<boolean>(false);
    const { isAdmin, user_id } = useSelector(( {auth}: IApplicationState) => auth);
    const { byId, loading }: UserState = useSelector (( {user}: IApplicationState ) => user);


    const stateToProps = {

        user: byId,
        loading,
        isAdmin,
        user_id,
        visible,


    };

    const handleEdit = (values: any) => {
        dispatch(updateProfile(values));
        setVisible(false);
    };

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    const deleteUser = (values: any) => {
        dispatch(deleteUser(values));
    };


    const dispatchToProps = {

        fetchUserById: useCallback(( userId: string) => dispatch(fetchUserById(userId)), [dispatch]),
        openModal: useCallback(() => openModal(), [] ),
        closeModal: useCallback(() => closeModal(), [] ),
        handleEdit: useCallback((values: any) => handleEdit(values), []),
        deleteUser: useCallback((values:any) => deleteUser(values), []),
    };

    return <Profile {...stateToProps} {...dispatchToProps} />; 
}