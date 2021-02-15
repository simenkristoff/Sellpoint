import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';

export interface IProductListing {
  ownerID: number;
  purchaserID: number | null;
  upload_date: any; // check type
  price: number;
  hasBeenSold: boolean;
  category: string;
}

export const ProductListing: React.FC = () => {
  const [productInfo, setProductInfo] = useState<IProductListing>()

  useEffect(() => {
    // Test apiUrl
    const apiUrl = 'http://localhost:8000/products/product/1';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Code smell...
        setProductInfo({
          ownerID: data.owner,
          purchaserID: data.purchaser,
          upload_date: data.upload_date,
          price: data.price,
          hasBeenSold: data.has_been_sold,
          category: data.category
        })
      });
  }, [])

  // Test return statement
  return (
    <div>
      <p>Upload Date: {productInfo?.upload_date}</p>
      {JSON.stringify(productInfo, null, '\t')}
    </div>
  );
};

