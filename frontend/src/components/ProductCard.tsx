import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ProductEntity } from '@/state/ducks/product/types';
import { Link } from 'react-router-dom';
import { DeleteButton } from './DeleteButton';
import { FavouriteButton } from './FavouriteButton';
import { PropertySafetyFilled } from '@ant-design/icons';
import { updateProduct } from '@/state/ducks/product/actions';

interface IProps {
  product: ProductEntity;
  isAdmin: boolean;
  observerID: number | null;
  deleteProduct: (product: ProductEntity) => void;
}

export const ProductCard: React.FC<IProps> = ({ product, isAdmin, observerID, deleteProduct }: IProps) => {
  const dispatch = useDispatch();
  const [inFavourites, setInFavourites] = useState(false);
  const favouritesToolTipText = inFavourites ? "Remove from favourites" : "Add to favourites";

  const handleFavouriteButton = () => {
    setInFavourites(!inFavourites);
    
    if (observerID != null) {
      if (!product.favourited_by.includes(observerID)) {
        product.favourited_by = [...product.favourited_by, observerID];
      } else {
        let i;
        for (i = 0; i < product.favourited_by.length; i++) {
          if (product.favourited_by[i] === observerID) {
            product.favourited_by.splice(i, 1);
          }
        }
      }
      
      dispatch(updateProduct(product));
    }
  }

  useEffect(() => {
    if (observerID != null && product.favourited_by.includes(observerID)) {
      setInFavourites(true);
    }
  }, [])
  
  return (
    <div className='product-card-wrapper'>
      <article className='product-card'>
        {isAdmin && (
          <span className='c2a c2a-delete'>
            <DeleteButton onClick={() => deleteProduct(product)} />
          </span>
        )}
        {observerID != null && (
        <span className='heart'>
          <FavouriteButton onClick={handleFavouriteButton} 
            tooltipText={favouritesToolTipText} inFavourites={inFavourites} />
        </span>
        )}
        <div className='product-cover'>
          <img src={product.image} alt={product.title} />
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
