import React from 'react';
import { ProductListingList } from './ProductListing/ProductListingList';

/**
 * Frontpage component. The main landing page.
 */
export const Frontpage: React.FC = () => {
  return (
    <div>
      <ProductListingList />
    </div>
  );
};
