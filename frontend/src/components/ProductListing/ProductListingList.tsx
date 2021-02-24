import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Route } from 'react-router-dom';
import { Image } from 'antd';
import { Card, Avatar, Row, Col, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, RocketTwoTone, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { DeleteButton } from '../DeleteButton';
import { useSelector } from 'react-redux';
import {IApplicationState} from '@/state/interface';
import { apiCaller } from '@/state/utils';

const { Meta } = Card;
const style = { background: '#0092ff', padding: '8px 0' };

export interface IProductListing {
  id: number;
  owner: number;
  owner_details: {
    username: string;
    email: string;
    first_name: string | undefined;
    last_name: string | undefined;
  };
  owner_username: number;
  purchaser_username?: number | null;
  upload_date: string; // convert to date with .toUTCString()
  price: number;
  title: string;
  description: string | null;
  has_been_sold: boolean;
  category?: string;
  image: string;
}

export const ProductListingList: React.FC = () => {
  const [productList, setProductList] = useState<IProductListing[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const {isAdmin} = useSelector(({auth}: IApplicationState) => auth)

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/product/products/';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProductList(data as IProductListing[]);
      });
  }, []);
  
  const deleteRequest = (url: string) => {
    apiCaller('DELETE', url);
  };

  return (
    <Row style={{ margin: '1rem' }}>
      {productList.map(product => (
        <Col xs={24} sm={12} xl={8} key={product.id} style={{ textAlign: 'center' }}>
          <div className='product-preview'>
            <Link to={() => `/annonser/${product.id.toString()}`} className='image-frame'>
              <img src={product.image} alt='' />
            </Link>
            <Row className='card-header'>
              <Col className='title' span={12}>
                <Link
                  to={{
                    pathname: `/annonser/${product.id.toString()}`,
                  }}
                >
                  <h1>{product.title}</h1>
                </Link>
              </Col>
              <Col className='price' span={12}>
                {product.price} NOK
              </Col>
              <Link to='#'>
                <h3>@{product.owner_details.username}</h3>
              </Link>
              {isAdmin && <DeleteButton onClick={() => deleteRequest(`product/products/${product.id.toString()}`)} tooltipText='Slett Annonse' />}
            </Row>
          </div>
        </Col>
      ))}
    </Row>
  );
};
