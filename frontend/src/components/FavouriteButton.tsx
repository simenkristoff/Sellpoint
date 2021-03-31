import React from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface IProps {
  /** function to be executed on click */
  onClick: () => void;

  /** text to be displayed at mouse hover */
  tooltipText?: string;
}

export const FavouriteButton: React.FC<IProps> = (props: IProps) => {
  return (
    <Tooltip title={props.tooltipText}>
      <Button icon={<HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '30px' }} />} 
        style={{ border: 'none', background: 'none' }} onClick={() => console.log("Hællæ")} />
    </Tooltip>
  );
};
