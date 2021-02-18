import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Route } from 'react-router-dom';
import { Image } from 'antd';
import { Card, Avatar, Row, Col, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, RocketTwoTone, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { DeleteButton } from '../DeleteButton';

const { Meta } = Card;
const style = { background: '#0092ff', padding: '8px 0' };

export interface IProductListing {
  id: number;
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

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/product/products/';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProductList(data as IProductListing[]);
      });
  }, []);

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
                <h3>@{product.owner_username}</h3>
              </Link>
              <DeleteButton url={`http://localhost:8000/product/products/${product.id.toString()}`} />
            </Row>
          </div>
        </Col>
      ))}
    </Row>
  );
};

{
  /* <Card
  style={{ width: '90%', marginBottom: '1rem', borderBlockColor: 'black' }}
  cover={<img alt='example' src={product.image} style={{ height: 300 }} />}
  // actions={[
  //   <SettingOutlined key="setting" />,
  //   <EditOutlined key="edit" />,
  //   <EllipsisOutlined key="ellipsis" />,
  // ]}
>
  <Meta
    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
    title={product.title}
    description={'Pris: ' + product.price.toString() + ' NOK'}
  />
</Card> */
}
