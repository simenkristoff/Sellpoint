import React from 'react';
import { Button, Form, Layout } from 'antd';
import { SearchInput } from '../SearchInput';
import { ProductEntity } from '@/state/ducks/product/types';
import { renderSelectFilter, renderSliderFilter } from '@/utils';
import { ProductFilterInterface } from './interface';
import { FilterOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export const ProductFilter: React.FC<ProductFilterInterface> = ({
  form,
  filterTypes,
  onSearchFilterChange,
  onFilterChange,
  onFilterReset,
}: ProductFilterInterface) => {
  return (
    <Sider
      trigger={<FilterOutlined />}
      width={300}
      theme='light'
      collapsible
      collapsedWidth={0}
      breakpoint='xxl'
      className='product-filter'
      defaultCollapsed
    >
      <SearchInput onChange={onSearchFilterChange} />
      <Form form={form} onFieldsChange={onFilterChange} name='filter-form' layout='vertical'>
        {Object.entries(filterTypes).map(([key, value], index) => {
          if (!value) return;
          const { type, field, dependency, label, postfix } = value;
          if (!type || !dependency) return;

          switch (type) {
            case 'slider':
              return renderSliderFilter<ProductEntity>(onFilterChange, index, key, dependency, field, label, postfix);
            case 'select':
              return renderSelectFilter<ProductEntity>(index, key, dependency, field, label, postfix);
          }
        })}
        <Form.Item>
          <Button type='primary' size='large' style={{ width: '100%' }} onClick={() => onFilterReset()}>
            Tilbakestill
          </Button>
        </Form.Item>
      </Form>
    </Sider>
  );
};
