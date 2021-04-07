import { AdvertEntity } from '@/state/ducks/advert/types';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';

interface AdvertDataListInterface {
  data: AdvertEntity[];
  submit: (advert: AdvertEntity) => void;
  edit: (advert: AdvertEntity) => void;
  remove: (advert: AdvertEntity) => void;
  renew: (advert: AdvertEntity) => void;
}

export const AdvertDataList: React.FC<AdvertDataListInterface> = (props: AdvertDataListInterface) => {
  const { data, edit, remove, renew } = props;
  const columns: ColumnsType<AdvertEntity> = [
    {
      title: 'Reklametittel',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      sorter: (a, b) => a.title.localeCompare(b.title, 'nb'),
    },
    {
      title: 'Startet',
      dataIndex: 'created_date',
      key: 'created_date',
      align: 'center',
      sorter: (a, b) => a.created_date.toString().localeCompare(b.created_date.toString()),
      render: record => moment(record).format('ll'),
    },
    {
      title: 'Utgår',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
      align: 'center',
      sorter: (a, b) => a.expiry_date.toString().localeCompare(b.expiry_date.toString()),
      render: record => moment(record).format('ll'),
    },
    {
      title: 'Varighet',
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      sorter: (a, b) => a.duration.toString().localeCompare(b.duration.toString()),
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
      render: (_text: any, record) => renderActions(record),
    },
  ];

  const renderActions = (record: AdvertEntity) => {
    if (!record.active) {
      return (
        <Space size='middle'>
          <Tooltip title='Forny reklamen'>
            <Button type='ghost' shape='circle' icon={<ReloadOutlined />} onClick={() => renew(record)} />
          </Tooltip>
          <Button danger type='ghost' shape='circle' icon={<DeleteOutlined />} onClick={() => remove(record)} />
        </Space>
      );
    }

    return (
      <Space size='middle'>
        <Button type='ghost' shape='circle' icon={<EditOutlined />} onClick={() => edit(record)} />
        <Button danger type='ghost' shape='circle' icon={<DeleteOutlined />} onClick={() => remove(record)} />
      </Space>
    );
  };

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
