import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface IProps {
  /** url that will be sent a DELETE request when button is clicked */
  url: string;

  /** text to be displayed at mouse hover */
  tooltipText?: string;
}

export const DeleteButton: React.FC<IProps> = (props: IProps) => {
  const deleteRequest = (url: string) => {
    fetch(url, { method: 'DELETE' }).then(res => console.log(res.text()));
  };

  return (
    <Tooltip title={props.tooltipText} >
      <Button type='primary' shape='circle' icon={<DeleteOutlined />} danger onClick={() => deleteRequest(props.url)} />
    </Tooltip>
  );
};
