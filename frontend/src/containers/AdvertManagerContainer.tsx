import React, { useCallback, useEffect, useRef, useState } from 'react';
import AdvertManager from '@/components/AdvertManager';
import { WithAdvertAuth } from '@/hoc';
import { fetchAdvertByUser, updateAdvert, createAdvert, deleteAdvert, setAdvert } from '@/state/ducks/advert/actions';
import { IApplicationState } from '@/state/interface';
import { useDispatch, useSelector } from 'react-redux';
import { AdvertEntity } from '@/state/ducks/advert/types';
import moment from 'moment';

export const AdvertManagerContainer = () => {
  const dispatch = useDispatch();
  const editMode = useRef<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const auth = useSelector(({ auth }: IApplicationState) => auth);
  const advert_state = useSelector(({ advert }: IApplicationState) => advert);

  useEffect(() => {
    if (auth.user_id) {
      dispatch(fetchAdvertByUser(auth.user_id));
    }
  }, []);

  const handleSubmit = (advert: AdvertEntity) => {
    if (editMode.current) {
      dispatch(updateAdvert(advert));
    } else {
      dispatch(createAdvert(advert));
    }
    handleClose();
  };

  const handleEdit = (advert?: AdvertEntity) => {
    if (advert) {
      editMode.current = true;
      dispatch(setAdvert(advert));
    }
    setVisible(true);
  };

  const handleRemove = (advert: AdvertEntity) => {
    dispatch(deleteAdvert(advert));
  };

  const handleRenew = (advert: AdvertEntity) => {
    dispatch(updateAdvert({ ...advert, created_date: moment().format(), active: true }));
  };

  const handleClose = () => {
    editMode.current = false;
    setVisible(false);
    dispatch(setAdvert({}));
  };

  const stateToProps = {
    ...advert_state,
    visible,
    editMode: editMode.current,
  };

  const dispatchToProps = {
    submit: useCallback((values: AdvertEntity) => handleSubmit(values), []),
    edit: useCallback((values?: AdvertEntity) => handleEdit(values), []),
    remove: useCallback((values: AdvertEntity) => handleRemove(values), []),
    renew: useCallback((values: AdvertEntity) => handleRenew(values), []),
    close: useCallback(() => handleClose(), []),
  };

  return (
    <WithAdvertAuth>
      <AdvertManager {...stateToProps} {...dispatchToProps} />
    </WithAdvertAuth>
  );
};
