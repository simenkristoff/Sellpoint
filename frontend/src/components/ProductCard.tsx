import React from 'react';
import moment from 'moment';
import { ProductEntity } from '@/state/ducks/product/types';
import { Link } from 'react-router-dom';
import { DeleteButton } from './DeleteButton';

interface IProps {
  product: ProductEntity;
  isAdmin: boolean;
  deleteProduct: (product: ProductEntity) => void;
}

export const ProductCard: React.FC<IProps> = ({ product, isAdmin, deleteProduct }: IProps) => {
  const cover: string = product.images.length > 0 ? `http://localhost:8000${product.images[0].image}` : '';

  return (
    <div className='product-card-wrapper'>
      <article className='product-card'>
        {isAdmin && (
          <span className='c2a c2a-delete'>
            <DeleteButton onClick={() => deleteProduct(product)} />
          </span>
        )}
        <div className='product-cover'>
          <img src={cover} alt={product.title} />
        </div>
        <Link to={`/annonser/${product.id}`} className='product-details'>
          <header className='header'>
            <div className='sub-header'>
              <span className='username'>@{product.owner_details.username}</span>
              <span className='added'>{moment(product.upload_date).format('ll')}</span>
            </div>
            <h3 className='product-title'>{product.title}</h3>
          </header>
          <footer className='footer'>
            <span className='categories'></span>
            <span className='price'>{product.price}kr</span>
          </footer>
        </Link>
      </article>
    </div>
  );
};
