import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface IProps {
  /** function to be executed on click */
  onClick: () => void;

  /** text to be displayed at mouse hover */
  tooltipText?: string;
}

export const DeleteButton: React.FC<IProps> = (props: IProps) => {
  return (
    <Tooltip title={props.tooltipText}>
      <Button type='primary' shape='circle' icon={<DeleteOutlined />} danger onClick={() => props.onClick()} />
    </Tooltip>
  );
};
