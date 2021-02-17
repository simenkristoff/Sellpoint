import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useParams, RouteComponentProps } from 'react-router-dom';
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
    // console.log("params", params);
    // Test apiUrl
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
