import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductState } from '@/state/ducks/product/types';
import { EntityId, IApplicationState } from '@/state/interface';
import { fetchFavourites, fetchProducts } from '@/state/ducks/product/actions';
import { useWindowSize } from '@/hooks';
import { Breakpoints } from '@/components/ProductManager/interface';
import { FavouriteList } from '@/components/ProductManager/FavouriteList';

const breakpoints: Breakpoints = {
  lg: 6,
  md: 8,
};

export const FavouriteContainer = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [breakpointIndex, setBreakpointIndex] = useState<number>(2);
  const userId = useSelector(({ auth }: IApplicationState) => auth.user_id);
  const { favourites, loading }: ProductState = useSelector(({ product }: IApplicationState) => product);

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

  // Map Redux State to component props
  const stateToProps = {
    products: favourites,
    userId,
    loading,
    breakpoints,
    breakpointIndex,
  };

  // samme her bare delete user og sende til user profile

  // Map Redux Actions to component props
  const dispatchToProps = {
    fetchFavourites: useCallback((userID: EntityId) => dispatch(fetchFavourites(userID)), [dispatch]),
  };

  return <FavouriteList {...stateToProps} {...dispatchToProps} />;
};
