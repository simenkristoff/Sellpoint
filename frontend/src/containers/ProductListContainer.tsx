import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity, ProductState } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { createProduct, deleteProduct, fetchProducts } from '@/state/ducks/product/actions';
import { Form } from 'antd';
import { useWindowSize } from '@/hooks';
import { filterArray, initializeFilters } from '@/utils';
import { SearchFilterType, FilterTypeInterface } from '@/utils/filters/interface';
import { fetchCategories } from '@/state/ducks/category/actions';
import { isArray } from 'lodash';
import { locations } from '@/constants';
import { ProductManager } from '@/components/ProductManager/ProductManager';
import { Breakpoints } from '@/components/ProductManager/interface';

const breakpoints: Breakpoints = {
  lg: 6,
  md: 8,
};

export const ProductListContainer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [width] = useWindowSize();
  const [breakpointIndex, setBreakpointIndex] = useState<number>(2);
  const [visible, setVisible] = useState<boolean>(false);
  const categories = useSelector(({ category }: IApplicationState) => category.data);
  const { data, loading }: ProductState = useSelector(({ product }: IApplicationState) => product);
  const { isAdmin, isLoggedIn, user_id } = useSelector(({ auth }: IApplicationState) => auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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

  /** Setup Filters */
  const searchFilterTypes: SearchFilterType<ProductEntity> = {
    fields: ['title', 'description'],
  };

  const filterTypes: FilterTypeInterface<ProductEntity> = {
    price: {
      type: 'slider',
      dependency: [0, 10000],
      label: 'Pris',
    },
    category: {
      type: 'select',
      dependency: categories,
      field: 'name',
      label: 'Kategorier',
    },
    location: {
      type: 'select',
      dependency: locations,
      label: 'Sted',
    },
  };

  const { initialFilterState, filterState, setFilterState, filterFunctions } = initializeFilters<ProductEntity>(
    filterTypes,
    searchFilterTypes,
  );
  /** End filter setup */

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

  const handleFilterSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState: any = filterState;
    newState[name] = value;
    setFilterState({ ...newState });
  };

  const handleFilterChange = (changedFields: Array<any>) => {
    const newState = filterState;
    const value = changedFields[0].value;
    if (isArray(value)) {
      newState[changedFields[0].name[0]] = value;
    } else {
      newState[changedFields[0].name[0]] = [value];
    }

    setFilterState({ ...newState });
  };

  const handleFilterReset = () => {
    form.resetFields();
    setFilterState(initialFilterState);
  };

  // Map Redux State to component props
  const stateToProps = {
    products: filterArray(data, filterFunctions, filterState),
    userId: user_id,
    loading,
    isAdmin,
    isLoggedIn,
    visible,
    breakpoints,
    breakpointIndex,
  };

  // samme her bare delete user og sende til user profile

  // Map Redux Actions to component props
  const dispatchToProps = {
    fetchProducts: useCallback(() => dispatch(fetchProducts()), [dispatch]),
    deleteProduct: useCallback((data: ProductEntity) => dispatch(deleteProduct(data)), [dispatch]),
    handleCreate: useCallback((values: any) => handleCreate(values), []),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  const filterProps = {
    form,
    filterTypes,
    onSearchFilterChange: useCallback(e => handleFilterSearchChange(e), []),
    onFilterChange: useCallback(changedFields => handleFilterChange(changedFields), []),
    onFilterReset: useCallback(() => handleFilterReset(), []),
  };

  return <ProductManager {...filterProps} {...stateToProps} {...dispatchToProps} />;
};
