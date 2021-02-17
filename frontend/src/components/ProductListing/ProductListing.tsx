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
  const params = useParams<RouteParams>();
  const annonseID = params.id;

  useEffect(() => { 
    const apiUrl = 'http://localhost:8000/product/products/' + annonseID;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProductInfo(data as IProductListing);
      });
  }, []);

  // Test return statement
  return (
    <MainLayout>
      <h1>{productInfo?.title}</h1>
      <p>{productInfo?.description}</p>
      <Image src={productInfo?.image}></Image>
    </MainLayout>
  );
};
