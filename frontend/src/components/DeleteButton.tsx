import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface IProps {
  /** url of item to be deleted */
  url: string;
}

export const DeleteButton: React.FC<IProps> = (props: IProps) => {
  const deleteProductListing = (url: string) => {
    fetch(url, { method: 'DELETE' }).then(res => console.log(res.text()));
  };

  return (
    <Tooltip title='delete'>
      <Button type='primary' shape='circle' icon={<DeleteOutlined />} danger onClick={() => deleteProductListing(props.url)} />
    </Tooltip>
  );
};
