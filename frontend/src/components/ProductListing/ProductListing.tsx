import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'antd';
import { IProductListing } from './ProductListingList';
import { MainLayout } from '../../layout/MainLayout';
import { IApplicationState } from '@/state/interface';
import { fetchUsers, fetchUserById } from '@/state/ducks/user/actions';
import { useDispatch, useSelector } from 'react-redux';

interface RouteParams {
  id: string;
}

export const ProductListing: React.FC = () => {
  const [productInfo, setProductInfo] = useState<IProductListing>();
  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const { data, byId } = useSelector(({ user }: IApplicationState) => user);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/product/products/' + id;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProductInfo(data as IProductListing);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
    if (productInfo) dispatch(fetchUserById(productInfo?.owner!));
  }, [productInfo]);

  // Test return statement
  return (
    <div>
      <h1>{productInfo?.title}</h1>
      <p>{productInfo?.description}</p>
      <Image src={productInfo?.image}></Image>
      <h2>All users</h2>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
      <h2>User by Id</h2>
      <pre>{JSON.stringify(byId, undefined, 2)}</pre>
      {data.length > 0 && data[0].id}
    </div>
  );
};
