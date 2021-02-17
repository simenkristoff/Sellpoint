import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'antd';
import { IProductListing } from './ProductListingList';
import { MainLayout } from '../../layout/MainLayout';

interface RouteParams {
  id: string;
}

export const ProductListing: React.FC = () => {
  const [productInfo, setProductInfo] = useState<IProductListing>();
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/product/products/' + id;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProductInfo(data as IProductListing);
      });
  }, []);

  // Test return statement
  return (
    <div>
      <h1>{productInfo?.title}</h1>
      <p>{productInfo?.description}</p>
      <Image src={productInfo?.image}></Image>
    </div>
  );
};
