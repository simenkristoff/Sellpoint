import { AdvertEntity } from '@/state/ducks/advert/types';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';

interface AdvertDataListInterface {
  data: AdvertEntity[];
  submit: (advert: AdvertEntity) => void;
  edit: (advert: AdvertEntity) => void;
  remove: (advert: AdvertEntity) => void;
}

export const AdvertDataList: React.FC<AdvertDataListInterface> = (props: AdvertDataListInterface) => {
  const { data, edit, remove } = props;
  const columns: ColumnsType<AdvertEntity> = [
    {
      title: 'Reklametittel',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      sorter: (a, b) => a.title.localeCompare(b.title, 'nb'),
    },
    {
      title: 'Varighet',
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      sorter: (a, b) => a.duration.toString().localeCompare(b.duration.toString()),
    },
    {
      title: 'Dato opprettet',
      dataIndex: 'date_created',
      key: 'date_created',
      align: 'center',
      sorter: (a, b) => a.date_created.toString().localeCompare(b.date_created.toString()),
      render: record => moment(record).format('ll'),
    },
    {
      title: 'Status',
      className: 'hide-md',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      sorter: (a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1),
      render: record => (record === true ? 'Aktiv' : 'Inaktiv'),
    },
    {
      title: 'Handlinger',
      className: 'hide-sm',
      key: 'action',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: (_text: any, record) => (
        <Space size='middle'>
          <Button type='ghost' shape='circle' icon={<EditOutlined />} onClick={() => edit(record)} />
          <Button danger type='ghost' shape='circle' icon={<DeleteOutlined />} onClick={() => remove(record)} />
        </Space>
      ),
    },
  ];

  const tableProps: TableProps<AdvertEntity> = {
    showSorterTooltip: false,
    pagination: {
      pageSize: 10,
      position: ['bottomCenter'],
    },
    dataSource: data,
    columns,
    rowKey: record => record.id,
  };

  return <Table {...tableProps}></Table>;
};
