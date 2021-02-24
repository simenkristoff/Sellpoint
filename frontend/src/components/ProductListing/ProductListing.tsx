import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'antd';
import { IProductListing } from './ProductListingList';
import { IApplicationState } from '@/state/interface';
import { fetchUsers, fetchUserById } from '@/state/ducks/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Typography } from 'antd';
import { Container } from '../Container';

const { Title } = Typography;
interface RouteParams {
  id: string;
}

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

  console.log(byId);
  const owner_details = byId
  console.log("owner_details:", owner_details)

  // Test return statement
  return (
    <Container size='default' className='product-single'>
      <Row justify='space-between'>
        <Col className='image-view' span={17}>
          <Image src={productInfo?.image}></Image>
        </Col>
        <Col className='product-details' span={6}>
          <Card title={`@${productInfo?.owner_details.username}`} extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>{productInfo?.owner_details.first_name} {productInfo?.owner_details.last_name}</p>
            <p>Epost: {productInfo?.owner_details.email}</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title>
            {productInfo?.title}
            <Title level={3}>{productInfo?.price} kr</Title>
          </Title>
          <h2>{productInfo?.description}</h2>
        </Col>
      </Row>
    </Container>
  );
};
