import { Layout } from 'antd';
import React from 'react';
import { ProductListInterface, ProductFilterInterface } from './interface';
import { ProductFilter } from './ProductFilter';
import { ProductList } from './ProductList';

export const ProductManager: React.FC<ProductListInterface & ProductFilterInterface> = (
  props: ProductListInterface & ProductFilterInterface,
) => {
  const { form, filterTypes, onSearchFilterChange, onFilterChange, onFilterReset, ...productProps } = props;
  const filterProps = {
    form,
    filterTypes,
    onSearchFilterChange,
    onFilterChange,
    onFilterReset,
  };

  return (
    <Layout>
      <ProductFilter {...filterProps} />
      <Layout>
        <ProductList {...productProps} />
      </Layout>
    </Layout>
  );
};
