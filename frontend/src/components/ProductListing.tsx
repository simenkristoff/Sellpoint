import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Image } from 'antd';

export interface IProductListing {
  owner_username: number;
  purchaser_username?: number | null;
  upload_date: string; // må konverteres til dato med .toUTCString()
  price: number;
  description: string | null;
  has_been_sold: boolean;
  category?: string;
}

export const ProductListing: React.FC = () => {
  const [productInfo, setProductInfo] = useState<IProductListing>();

  useEffect(() => {
    // Test apiUrl
    const apiUrl = 'http://localhost:8000/product/products/12/';
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
      <p>Upload Date: {productInfo?.owner_username}</p>
      {JSON.stringify(productInfo, null, '\t')}
      <Image width={200} src='http://localhost:8000/media/user_2/pink-car.jpg' />
    </div>
  );
};
