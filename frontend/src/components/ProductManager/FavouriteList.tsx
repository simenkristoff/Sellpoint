import React, { useContext, useEffect } from 'react';
import { Col, Form, Result, Row } from 'antd';

import { Container } from '@/components/Container';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/Spinner';
import { Advert } from '@/components/Advert';
import { pickRandomAd } from '@/utils';
import { AdsContext } from '@/context';
import { FavouriteListInterface } from './interface';
import { useHistory } from 'react-router';
import { HeartOutlined } from '@ant-design/icons';

export const FavouriteList: React.FC<FavouriteListInterface> = ({
  products,
  userId,
  loading,
  breakpoints,
  breakpointIndex,
  fetchFavourites,
}: FavouriteListInterface) => {
  const history = useHistory();
  const ads = useContext(AdsContext);
  useEffect(() => {
    if (!userId) {
      history.push('/logg_inn');
    } else {
      fetchFavourites(userId);
    }
  }, []);

  // Handle render logic
  const render = () => {
    if (loading) {
      return <Spinner loading centered />;
    } else if (products.length < 1) {
      return <Result icon={<HeartOutlined />} title='Du har ikke lagt til noen favoritter ennå' />;
    }

    return (
      <Container size='default' className='product-list'>
        <div className='header'>{<h1 className='title'>Mine favoritter</h1>}</div>

        <Row gutter={[16, 16]}>
          {products.length > 0 &&
            products.map((product, index) => [
              <Col lg={breakpoints.lg} md={breakpoints.md} span={24} key={product.id}>
                <ProductCard product={product} isAdmin={false} observerID={userId} />
              </Col>,
              index > 0 && index % breakpointIndex === 0 && (
                <Advert key={`ad-${index}`} ad={pickRandomAd(ads)} style={{ padding: '0 8px' }} />
              ),
            ])}
        </Row>
      </Container>
    );
  };

  return render();
};
