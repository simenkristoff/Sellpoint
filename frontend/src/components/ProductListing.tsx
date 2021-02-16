import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';

export interface IProductListing {
  owner_username: number; 
  purchaser_username?: number | null; 
  upload_date: any; // check type
  price: number;
  description: string | null;
  has_been_sold: boolean;
  category?: string;
}

export const ProductListing: React.FC = () => {
  const [productInfo, setProductInfo] = useState<IProductListing>();

  useEffect(() => {
    // Test apiUrl
    const apiUrl = 'http://localhost:8000/product/products/1/';
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
    </div>
  );
};
