import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity, ProductState } from '@/state/ducks/product/types';
import { IApplicationState } from '@/state/interface';
import { createProduct, deleteProduct, fetchFavouritesByUserId, fetchProducts } from '@/state/ducks/product/actions';
import { ProductList } from '@/components/ProductList';
import { ProductFilter } from '@/components/ProductFilter';
import { Form } from 'antd';
import { stringify } from 'querystring';

interface filterStateInterface {
  [key: string]: any;
}

const initialFilterState: filterStateInterface = {
  searchText: '',
  // maxPrice: 9999999,
}

interface IProps {
  favourites?: boolean;
}

export const ProductListContainer: React.FC<IProps> = ({ favourites=false }) => {
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState<filterStateInterface>(initialFilterState);
  let filterList: ProductEntity[] = []
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

  const applyFilters = (): ProductEntity[] => {
    const filterKeys = Object.keys(filters)
    return data.filter((product) => {
      return filterKeys.every((key: string, index: number) => {
        return filters[key](product)
      })})
  }

  const filterProducts = (changedFields: any, allFields: any) => {
    allFields.forEach((field: any) => {if (field.name == 'searchText') {
      setFilterState({searchText: field.value});
    }});
    // allFields.forEach((field: any) => {if (field.name == 'maxPrice') {
    //  setFilterState({maxPrice: field.value});
    // }});
  };

  const filters: any = {
    searchText: (product: ProductEntity) => product.title.toLowerCase().includes(filterState['searchText'].toLowerCase())
    // maxPrice: (product: ProductEntity) => product.price <= filterState['maxPrice']
  }

  useEffect(() => {}, [filters]);

  const [form] = Form.useForm();

  // Map Redux State to component props
  const stateToProps = {
    products: applyFilters(),
    loading,
    isAdmin,
    isLoggedIn,
    user_id,
    visible,
    favourites
  };

  // Map Redux Actions to component props
  const dispatchToProps = {
    fetchProducts: useCallback(() => dispatch(fetchFunction), [dispatch, favourites]),
    deleteProduct: useCallback((data: ProductEntity) => dispatch(deleteProduct(data)), [dispatch]),
    handleCreate: useCallback((values: any) => handleCreate(values), []),
    openModal: useCallback(() => openModal(), []),
    closeModal: useCallback(() => closeModal(), []),
  };

  return <div>
    <ProductFilter filterProducts={filterProducts} form={form}/>
    <ProductList {...stateToProps} {...dispatchToProps} />
    </div>;
};
