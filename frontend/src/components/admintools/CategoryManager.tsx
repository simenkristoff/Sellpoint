import { createCategory, deleteCategory, fetchCategories } from '@/state/ducks/category/actions';
import { CategoryEntity } from '@/state/ducks/category/types';
import { IApplicationState } from '@/state/interface';
import { Button, Form, Input, PageHeader, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteButton } from '../DeleteButton';

/**
 * Category Manager Component. A panel to add, remove and view categories.
 */
export const CategoryManager: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useSelector(({ category }: IApplicationState) => category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleAddCategory = (values: any) => {
    dispatch(createCategory(values));
  };

  const handleDeleteCategory = (values: any) => {
    dispatch(deleteCategory(values));
  };

  const columns: ColumnsType<CategoryEntity> = [
    {
      title: 'Navn',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
    {
      title: 'Handlinger',
      key: 'action',
      align: 'center',
      width: '5%',
      // eslint-disable-next-line react/display-name
      render: record => <DeleteButton onClick={() => handleDeleteCategory(record)} />,
    },
  ];

  const tableProps: TableProps<CategoryEntity> = {
    showSorterTooltip: false,
    pagination: {
      pageSize: 10,
      position: ['bottomCenter'],
    },
    dataSource: data,
    columns,
    rowKey: record => record.id,
  };

  const renderForm = () => {
    return [
      <Form key='add_category' onFinish={handleAddCategory} layout='inline' requiredMark='optional'>
        <Form.Item
          name='name'
          label='Kategorinavn'
          rules={[
            { required: true, message: 'Vennligst skriv inn et navn' },
            { max: 24, message: 'Maks lengde på kategorinavn er 24' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Legg til
          </Button>
        </Form.Item>
      </Form>,
    ];
  };

  return (
    <div className='category-manager'>
      <PageHeader ghost={false} title={'Legg til kategori'} extra={renderForm()}></PageHeader>

      <Table {...tableProps} />
    </div>
  );
};
