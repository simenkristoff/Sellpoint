import React from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface IProps {
  /** function to be executed on click */
  onClick: (event: React.MouseEvent<HTMLElement> | undefined) => void;

  /** text to be displayed at mouse hover */
  tooltipText?: string;

  /** displayes pink heart if true */
  inFavourites: boolean;
}

export const FavouriteButton: React.FC<IProps> = (props: IProps) => {
  const color = props.inFavourites ? '#eb2f96' : 'lightgrey';

  return (
    <Tooltip title={props.tooltipText}>
      <Button
        icon={<HeartTwoTone twoToneColor={color} style={{ fontSize: '30px' }} />}
        style={{ border: 'none', background: 'none' }}
        onClick={e => props.onClick(e)}
      />
    </Tooltip>
  );
};
